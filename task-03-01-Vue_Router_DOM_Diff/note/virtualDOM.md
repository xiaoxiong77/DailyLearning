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

## Snabbdom源码解析
- 源码地址：https://github.com/snabbdom/snabbdom
- Snabbdom的核心
    - 使用h()函数创建JavaScript对象(VNode)描述真实DOM
    - init设置模块，创建patch()函数
    - patch()函数比较新旧两个VNode
    - 把变化的内容更新到真实DOM树上

### h函数
- h函数最早见于hyperscript，使用JavaScript创建超文本
- Snabbdom中的h函数不是用来创建超文本，而是创建VNode
- 函数重载：
    - 参数个数或者类型不同的函数
    - JavaScript中没有重载的概念
    - TypeScript中有，不过重载的实现还是通过代码调整参数
    ```
    function add (a, b) {
        console.log(a + b)
    }

    function add (a, b, c) {
        console.log(a + b + c)
    }

    add(1, 2)
    add(1, 2, 3)
    ```
- 源码位置：src/package/h.ts
```
import { vnode, VNode, VNodeData } from './vnode'
import * as is from './is'

export type VNodes = VNode[]
export type VNodeChildElement = VNode | string | number | undefined | null
export type ArrayOrElement<T> = T | T[]
export type VNodeChildren = ArrayOrElement<VNodeChildElement>

function addNS (data: any, children: VNodes | undefined, sel: string | undefined): void {
  data.ns = 'http://www.w3.org/2000/svg'
  if (sel !== 'foreignObject' && children !== undefined) {
    for (let i = 0; i < children.length; ++i) {
      const childData = children[i].data
      if (childData !== undefined) {
        addNS(childData, (children[i] as VNode).children as VNodes, children[i].sel)
      }
    }
  }
}

// h 函数的重载
export function h (sel: string): VNode
export function h (sel: string, data: VNodeData | null): VNode
export function h (sel: string, children: VNodeChildren): VNode
export function h (sel: string, data: VNodeData | null, children: VNodeChildren): VNode
export function h (sel: any, b?: any, c?: any): VNode {
  var data: VNodeData = {}
  var children: any
  var text: any
  var i: number
  // 处理参数，实现重载的机制
  if (c !== undefined) {
    // 处理三个参数的情况(sel、data、children/text)
    if (b !== null) {
      data = b
    }
    if (is.array(c)) { // 如果 c 是数组
      children = c
    } else if (is.primitive(c)) { // 如果 c 是字符串或者数字
      text = c
    } else if (c && c.sel) { // 如果 c 是 VNode
      children = [c]
    }
  } else if (b !== undefined && b !== null) {
    // 处理两个参数的情况
    if (is.array(b)) { // 如果 b 是数组
      children = b
    } else if (is.primitive(b)) { // 如果 b 是字符串或者数字
      text = b
    } else if (b && b.sel) { // 如果 b 是VNode
      children = [b]
    } else { data = b }
  }
  if (children !== undefined) {
    // 处理children中的原始值（string/number）
    for (i = 0; i < children.length; ++i) {
      // 如果 children 是 string/number，创建文本节点
      if (is.primitive(children[i])) children[i] = vnode(undefined, undefined, undefined, children[i], undefined)
    }
  }
  if (
    sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&
    (sel.length === 3 || sel[3] === '.' || sel[3] === '#')
  ) {
    // 如果是 svg，添加命名空间
    addNS(data, children, sel)
  }
  // 返回vnode
  return vnode(sel, data, children, text, undefined)
};
```