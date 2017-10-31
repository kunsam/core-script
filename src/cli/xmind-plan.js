const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const merge = require('lodash/merge')

import getXmindRootDom from '../xmind/src/getXmindRootDom'
import { analyseWorkflow } from '../xmind/plan/statistic'
import { flattenInstance, resolveInstances } from '../xmind/plan/instance'
import { getPageWorkflow, getComponentWorkflow } from '../xmind/plan/workflow'
import { getDevelopData, getWorkflowModel } from '../xmind/plan/getDevelopData'

import config from '../config'
import xmindConfig from '../xmind/plan/xmind-config'
const { basePath } = config

const userConfigPath = path.join(basePath, 'core.config.js')
if (!fs.existsSync(userConfigPath)) throw Error('请在项目根路径下配置core.config.js')
const userConfig = require(userConfigPath).default
const { xmind } = userConfig

const { timeField, seriesTime, workflowModel, specialSymbolMap, difficultyField } = xmindConfig

if (!xmind.plan.path) throw Error('请配置 xmind.plan.path ')

const sourcePath = path.join(basePath, xmind.plan.path)
const outputConfig = xmind.plan.output || {
  data: '',
  projectMarkDown: '',
  workflowsMarkDown: '',
}

const getDefaultOutput = (field) => {
  return path.join(basePath, outputConfig && outputConfig['field'] || `${path.dirname(sourcePath)}/plan-output`)
}
let outputPath = {}
Object.keys(outputConfig).forEach(key => {
  outputPath[key] = getDefaultOutput(key)
})

const xmindRootDom = getXmindRootDom(sourcePath)
// 1. 获得开发模型和开发实例数据
const develop = getDevelopData(xmindRootDom)

// console.log(develop.instance, 'developdevelop')
// 2. 获得所有需要的开发流模型
const model = getWorkflowModel(xmindRootDom, merge({ APP: develop.model }, workflowModel))


// 3. 解析所有展开的实例
const resolvedFlattenInstances = resolveInstances(flattenInstance(develop.instance))


// 4. 从实例分别获得工作流
// const pageWorkflow = getPageWorkflow(resolvedFlattenInstances.page, model.APP)
// const componentWorkflow = getComponentWorkflow(resolvedFlattenInstances.component, model)

// 5. 合并工作流
// let allWorkflow = []
// for (let [name, value] of Object.entries(pageWorkflow)) {
//   allWorkflow.push({
//     name,
//     page: name,
//     busniess: '页面业务',
//     ...value
//   })
// }
// for (let [name, { pageName, className, workflow }] of Object.entries(componentWorkflow)) {
//   if (pageName && className && workflow) {
//     allWorkflow.push({
//       name,
//       page: pageName,
//       busniess: className,
//       type: '模块业务',
//       ...workflow
//     })
//   }
// }
// let customFlows = []
// for (let [name, value] of Object.entries(resolvedFlattenInstances.custom)) {
//   customFlows.push({
//     name,
//     time: 
//   })
// }


// const statistic = analyseWorkflow(allWorkflow)




// const projectModel = {
//   allWorkflow,
//   ...statistic,
//   // customFlows // createProjectMd.js里需要
// }

// const projectMarkDown = createProjectMardDown(projectModel)
// const workflowsMarkDown = createWorkflowMd(allWorkflows)

// console.log(allWorkflow, 'allWorkflow');