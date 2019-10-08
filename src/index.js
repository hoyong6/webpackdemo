import _ from 'lodash';
import './style.scss';
import printMe from './print.js';
function component() {
  let element = document.createElement('div');
  var btn = document.createElement('button');
  // lodash 是由当前 script 脚本 import 导入进来的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ')
  element.innerHTML += '<h1>追加内容为H3字体</h1>'
  element.classList.add('hello')

  btn.innerHTML = '点击这里，然后查看 console!'
  btn.onclick = printMe
  element.appendChild(btn)
  return element;
}

document.body.appendChild(component())