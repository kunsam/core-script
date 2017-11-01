import commander from 'commander'
import config from '../config'
import chalk from 'chalk'

commander
  .version(config.version);


const CORE = [
  {
    class: '项目类',
    children: [
      { name: 'init-project', abbr: 'ipt', comment: 'open the guide of init a project [打开项目初始引导]' },
      { name: 'init-core', abbr: 'icr', comment: 'create core.config.js [创建配置文件]' },
      { name: 'xmind-plan', abbr: 'xplan', comment: 'generates project plan files from xmind tree [根据xmind创建项目评估表和工作流表]' }
    ]
  },
  {
    class: '业务类',
    children: [
      { name: 'app-expand', abbr: 'exp', comment: 'expand a page [展开一个页面的全部依赖]' }
    ]
  },
  {
    class: '元件类',
    children: [
      { name: 'xmind-ui', abbr: 'xui', comment: 'generates ui files from xmind tree [根据xmind生成元件ui文件]' },
      { name: 'create-component', abbr: 'ccp', comment: 'create a component [创建一个业务元件]' },
    ]
  },
  {
    class: '方法类',
    children: [
      { name: 'recompose', abbr: 'rcp', comment: 'use recompose faster [快捷使用]' }
    ]
  }
]

CORE.forEach(c => {
  c.children.forEach(data => {
    commander.command(data.name, data.comment)
    commander.command(data.abbr, `alias for ${data.name}`)
  })
})


commander.on('--help', function(){
  console.log('\n')
  CORE.forEach(c => {
    console.log(chalk.blue(`-- ${c.class}`))
    c.children.forEach((data, index) => {
      console.log(`${index + 1}.[${data.name}] abbr: `, chalk.yellow(`<core ${data.abbr}>`), data.comment)
    })
    console.log('\n');
  })
})

commander.parse(process.argv);
