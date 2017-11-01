'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loopInput;

var readlineSync = require('readline-sync');

function loopInput(question, condition) {
  var result = null;
  loop();
  function loop() {
    var input = readlineSync.question('\n' + question + ' ');
    var valid = condition(input);
    if (!valid) {
      console.log('输入错误，请重新输入');
      loop();
    } else {
      result = valid;
    }
  }
  return result;
}