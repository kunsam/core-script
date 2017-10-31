
// 以下路径配置是相对与项目根路径的配置

export default {
  xmind: {
    ui: {
      path: 'xmind/ui',
      // output: 'xmind/ui' // 不配置的话默认同xmind读取路径
    },
    plan: {
      pdf: true, // 是否生成Pdf,
      path: 'xmind/develop_model.xmind',

      // output: { // 默认为读取路径/plan-output
        // 用于工作流管理后台
        // data: 'xmind/data/projectModel.json',
        // projectMarkDown: 'xmind/data/projectMarkDown.md',
        // workflowsMarkDown: 'xmind/data/workflowsMarkDown.md',
      // }

    }
  }
}