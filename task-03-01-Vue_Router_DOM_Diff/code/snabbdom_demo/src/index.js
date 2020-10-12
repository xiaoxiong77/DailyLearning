// import { h, init } from 'snabbdom'
// // 导入模块
// import style from 'snabbdom/modules/style'
// import eventlisteners from 'snabbdom/modules/eventlisteners'

// // init函数：参数是一个数组，返回一个patch函数->作用是对比两个vnode的差异更新到真实DOM
// let patch = init([ // 注册模块
//     style,
//     eventlisteners
// ])

// // h函数：创建虚拟DOM
// // 第一个参数->标签+选择器；
// // 第二个参数->如果是字符串就是标签中的内容；如果是数组，表示子元素
// // let vnode = h('div#container.cls', 'hello world') 
// let vnode = h('div#container', {
//     style: {
//         backgroundColor: '#ccc'
//     },
//     on: {
//         click: eventHandler
//     }
// }, [
//     h('h1', 'h1'),
//     h('span', 'span')
// ])

// function eventHandler () {
//     console.log('click')
// }

// let app = document.querySelector('#app')

// // patch函数：返回值VNode
// // 第一个参数：可以是DOM元素，内部会把DOM元素转换成VNode
// // 第二个参数：VNode 
// let oldVnode = patch(app, vnode)

// // setTimeout(() => {
// //     // 清空页面元素(生成一个注释)
// //     patch(oldVnode, h('!'))
// // }, 2000)







// import { h, init } from 'snabbdom'

// // 1. hello world
// // 参数：数组，模块
// // 返回值：patch函数，作用对比两个vnode的差异更新到真实DOM
// let patch = init([])
// // 第一个参数：标签+选择器
// // 第二个参数：如果是字符串的话就是标签中的内容
// let vnode = h('div#container.cls', { 
//   hook: {
//     init (vnode) {
//       console.log(vnode.elm)
//     },
//     create (emptyVnode, vnode) {
//       console.log(vnode.elm)
//     }
//   }
// }, 'Hello World')

// let app = document.querySelector('#app')
// // 第一个参数：可以是DOM元素，内部会把DOM元素转换成VNode
// // 第二个参数：VNode
// // 返回值：VNde
// let oldVnode = patch(app, vnode)

// // 假设的时刻
// vnode = h('div', 'Hello Snabbdom')

// patch(oldVnode, vnode)



// import { h, init } from 'snabbdom'

// let patch = init([])

// // 首次渲染
// let vnode = h('ul', [
//   h('li', '首页'),
//   h('li', '视频'),
//   h('li', '微博')
// ])
// let app = document.querySelector('#app')
// let oldVnode = patch(app, vnode)

// // updateChildren 的执行过程
// vnode = h('ul', [
//   h('li', '首页'),
//   h('li', '微博'),
//   h('li', '视频')
// ])
// patch(oldVnode, vnode)



import { h, init } from 'snabbdom'

let patch = init([])

// 首次渲染
let vnode = h('ul', [
  h('li', { key: 'a' }, '首页'),
  h('li', { key: 'b' }, '视频'),
  h('li', { key: 'c' }, '微博')
])
let app = document.querySelector('#app')
let oldVnode = patch(app, vnode)

// updateChildren 的执行过程
vnode = h('ul', [
  h('li', { key: 'a' }, '首页'),
  h('li', { key: 'c' }, '微博'),
  h('li', { key: 'b' }, '视频')
])
patch(oldVnode, vnode)