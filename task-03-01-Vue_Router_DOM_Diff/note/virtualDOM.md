## 虚拟DOM
- 是由普通的JS对象来描述DOM对象，因为不是真实的DOM对象，所以称为Virtual DOM
- 为什么使用虚拟DOM
    - 手动操作DOM比较麻烦，还需要考虑浏览器兼容性问题，虽然有jQuery等库简化DOM操作，但是随着项目的复杂DOM操作复杂提升
    - 为了简化DOM的复杂操作于是出现了各种MVVM框架，MVVM框架解决了视图和状态的同步问题
    - 为了简化视图的操作我们可以使用模板引擎，但是模板引擎没有解决跟踪状态变化的问题，于是Virtual DOM出现了
    - Virtual DOM的好处是当状态改变时不需要立即更新DOM，只需要创建一个虚拟树来描述DOM，Virtual DOM内部将弄清楚如何有效的更新DOM
    - 虚拟DOM可以维护程序的状态，跟踪上一次的状态
    - 通过比较前后两次状态的差异更新真实DOM
- 作用
    - 维护视图和状态的关系
    - 复杂视图情况下提升渲染性能
    - 除了渲染DOM以外，还可以实现SSR(Nuxt.js/Next.js)、原生应用(Weekx/React Native)、小程序(mpvue/uni-app)等

## Snabbdom基本使用
- 使用parcel进行打包
- 创建项目，并安装yarn add parcle-bundler；安装yarn add snabbdom
- 导入Snabbdom
    - Snabbdom的核心仅提供了最基本的功能，只导出了三个函数init()、h()、thunk()
        - init()是一个高阶函数，返回patch()
        - h()返回虚拟节点VNode
        - thunk() 是一种优化策略，可以在处理不可变数据时使用
- Snabbdom 的核心库并不能处理元素的属性/样式/事件等，如果需要处理的话，可以使用模块
```
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
```

### 常用模块
- attributes
    - 设置DOM元素的属性,使用setAttribute()
    - 处理布尔类型的属性
- props
    - 和attributes模块相似，设置DOM元素的属性element[attr] = value
    - 不处理布尔类型的属性
- class
    - 切换类样式
    - 注意：给元素设置类样式是通过sel选择器
- dataset
    - 设置data-*的自定义属性
- eventlisteners
    - 注册和移除事件
- style
    - 设置行内样式，支持动画
    - delayed/remove/destory

### 模块使用
- 导入需要的模块
- init()中注册模块
- 使用h()函数创建VNode的时候，可以把第二个参数设置为对象，其他参数往后移
