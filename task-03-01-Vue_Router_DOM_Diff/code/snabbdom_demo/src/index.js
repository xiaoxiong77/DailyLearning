import { h, init } from 'snabbdom'
// 导入模块
import style from 'snabbdom/modules/style'
import eventlisteners from 'snabbdom/modules/eventlisteners'

// init函数：参数是一个数组，返回一个patch函数->作用是对比两个vnode的差异更新到真实DOM
let patch = init([ // 注册模块
    style,
    eventlisteners
])

// h函数：创建虚拟DOM
// 第一个参数->标签+选择器；
// 第二个参数->如果是字符串就是标签中的内容；如果是数组，表示子元素
// let vnode = h('div#container.cls', 'hello world') 
let vnode = h('div#container', {
    style: {
        backgroundColor: '#ccc'
    },
    on: {
        click: eventHandler
    }
}, [
    h('h1', 'h1'),
    h('span', 'span')
])

function eventHandler () {
    console.log('click')
}

let app = document.querySelector('#app')

// patch函数：返回值VNode
// 第一个参数：可以是DOM元素，内部会把DOM元素转换成VNode
// 第二个参数：VNode 
let oldVnode = patch(app, vnode)

// setTimeout(() => {
//     // 清空页面元素(生成一个注释)
//     patch(oldVnode, h('!'))
// }, 2000)