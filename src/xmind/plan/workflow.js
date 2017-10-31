import xmindConfig from '../plan/xmind-config'
const { timeField, seriesTime, stateField, specialSymbolMap, difficultyField } = xmindConfig
const pendTimeStr = `time:${timeField.pend}`

const chalk = require('chalk')
const omit = require('lodash/omit')
const merge = require('lodash/merge')
const isArray = require('lodash/isArray')

export function getPageWorkflow(instances, workflowModel) {
  const workflows = {}
  for (let [key, value] of Object.entries(instances)) {
    const flows = workflowModel.map(node => ({
      node: key + node.name ? `/${node.name}` : '',
      time: node.time,
      state: stateField.todo,
      bugs: []
    }))
    const difficulty = value.difficulty || difficultyField.normal
    // 还要插入串联计算
    if (flows.length > 1) {
      flows.push({
        node: '工作流串联与整体调试',
        time: {
          min: seriesTime.min * (flows.length - 1),
          max: seriesTime.max * (flows.length - 1),
          expect: Math.round((seriesTime.min + seriesTime.max) / 2) * (flows.length - 1)
        }
      })
    }

    const validTime = (time) => !!(time && time.min && time.max && time.expect)
    const removeSpecialFlows = flows.filter(f => validTime(f.time))
    let expect = null
    const minSchedule = removeSpecialFlows.map(f => f.time.min).reduce((p, a) => (p + a))
    const maxSchedule = removeSpecialFlows.map(f => f.time.max).reduce((p, a) => (p + a))
    switch (difficulty) {
      case difficultyField.simple: {
        expect = minSchedule
      }
      case difficultyField.difficult: {
        expect = maxSchedule
      }
      default: {
        expect = removeSpecialFlows.map(f => f.time.expect).reduce((p, a) => (p + a))
      }
    }
    workflows[key] = {
      flows: removeSpecialFlows,
      difficulty,
      schedule: {
        expect,
        min: minSchedule,
        max: maxSchedule
      },
      specialFlows: flows.filter(f => !validTime((f.time)))   // 事件待定的节点
    }
  }
  return workflows
}

export function getComponentWorkflow(instances, workflowModel) {
  let compWorkflows = {}
  instances = mergeRerference(instances) // 先根据引表，生成引用实例
  for (let [key, value] of Object.entries(instances)) { // key 是每个组件的名称
    const {
      className,
      module: { add, remove, replace },
      reference
    } = value
    if (className === '定制业务') {
      const specialModel = instanceWorkflow([], { add, remove, replace }).map(({ name, time }) => ({
        name,
        time: { min: time, max: time, expect: time }
      }))
      compWorkflows[key] = {
        ...value,
        workflow: getPageWorkflow({ [key]: value }, specialModel)[key]
      }
    } else {
      let matchWorkflowModel = workflowModel[className]// 因为要修改模型，深度复制一份
      if (!isArray(matchWorkflowModel)) { // 引用模型
        if (!matchWorkflowModel) {
          console.log(chalk.red(`[${key}] - 不存在该业务类型: [${className}] !\n`))
          return compWorkflows
        }
        if (!workflowModel[matchWorkflowModel.pointer]) {
          console.log(chalk.red(`业务指针错误, [${key}] - 不存在该业务类型: [${className}] !\n`))
          return compWorkflows
        }
        matchWorkflowModel = workflowModel[matchWorkflowModel.pointer]
      }
      if (!matchWorkflowModel) {
        console.log(chalk.red(key, '不存在工作流模型!\n'))
        return compWorkflows
      }
      const deepCopy = matchWorkflowModel.map(a => a)
      const newWorkflowModel = instanceWorkflow(deepCopy, { add, remove, replace })
      compWorkflows[key] = {
        ...value,
        workflow: getPageWorkflow({ [key]: value }, newWorkflowModel)[key]
      }
    }
  }
  return compWorkflows
}

export function mergeRerference(instances = {}) {
  let rinstances = {}
  for (let [key, value] of Object.entries(instances)) {
    const { reference } = value
    if (reference) {
      for (let [name, rvalue] of Object.entries(reference)) {
        let rname = name
        if (name[name.length - 1] === '/') {
          rname = name.slice(0, name.length - 1)
        }
        rinstances[rname] = {
          ...omit(value, ['reference']),
          module: rvalue.module || {} // merge(value.module, rvalue.module)
        }
      }
    }
    instances[key] = omit(value, ['reference'])
  }
  return merge(instances, rinstances)
}

function instanceWorkflow(workflow, moduler) { // 实例化工作流
  const { add, remove, replace } = moduler
  if (replace) { // 使用replace更新工作流
    // 找到首个位置
    // 过滤掉所有包括replace节点的流
    // 插入replace所有新增节点的流 从address开始接，没有就相当于首位直接替换
    for (let [rkey, rvalue] of Object.entries(replace)) {
      let firstIndex = null
      let count = null
      let replaceFlows = []
      const replacePath = rvalue.address + (rvalue.address ? '/' : '') + rkey
      workflow.forEach((flow, findex) => {
        if (flow.name.indexOf(replacePath) >= 0) {
          if (!firstIndex) firstIndex = findex
          if (!count) count = 0
          count++
        }
      })
      for (let [nmkey, nmvalue] of Object.entries(rvalue.newModule)) {
        replaceFlows.push({
          name: replacePath + '/' + nmkey, //  替换模块3
          time: nmvalue.time
        })
      }
      workflow.splice(firstIndex, count, ...replaceFlows)
    }
  }
  if (remove) {
    for (let [rkey, rvalue] of Object.entries(remove)) {
      const removePath = rvalue.address + (rvalue.address ? '/' : '') + rkey
      workflow = workflow.filter(flow => (flow.name.indexOf(removePath) === -1))
    }
  }
  if (add) {
    for (let [rkey, rvalue] of Object.entries(add)) {
      const addName = rvalue.address + (rvalue.address ? '/' : '') + rkey
      workflow.push({
        name: addName,
        time: rvalue.time
      })
    }
  }
  return workflow
}