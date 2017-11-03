
// 本文件由脚本生成，用于其它流程（主要是api-redux流程）读取所有api-keys进行遍历
// 如果直接读取 api/index 文件，读取内容多，文件大小也更大
// 因为node脚本要读取本文件，不能用common export写法

const apiKeys = [
	'fetchGetFlow',
]
const apiDesc = {
	fetchGetFlow: '抓取instance',
}
module.exports = {
  apiKeys,
  apiDesc
}
