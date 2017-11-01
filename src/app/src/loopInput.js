
const readlineSync = require('readline-sync')

export default function loopInput(question, condition) {
  let result = null
  loop()
  function loop() {
    const input = readlineSync.question(`\n${question} `)
    const valid = condition(input)
    if (!valid) {
      console.log('输入错误，请重新输入');
      loop()
    } else {
      result = valid
    }
  }
  return result
}