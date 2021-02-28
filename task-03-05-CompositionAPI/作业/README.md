## Vue 3.0 性能提升主要是通过哪几方面体现的？
- 响应式系统升级：Vue3使用Proxy对象重写了响应式系统
    - Vue.js 3.0中使用Proxy对象重写响应式系统：可监听动态新增的属性；可以监听删除的属性；可以监听数组的索引和length属性
- 编译优化：重写了DOM提高渲染的性能
    - Vue.js 3.0 中标记和提升所有的静态根节点，diff的时候只需要对比动态节点内容
- 源码体积的优化：通过优化源码的体积和更好的TreeShaking的支持，减少大打包的体积

## Vue 3.0 所采用的 Composition Api 与 Vue 2.x使用的Options Api 有什么区别？
- Options API
    - 包含一个描述组件选项(data、methods、props等)的对象
    - Options API 开发复杂组件，同一个功能逻辑的代码被拆分到不同选项
- Composition API
    - 是 Vue3 中新增的 API
    - 是基于函数的 API
    - 可以更灵活的组织组件的逻辑
    - 在 Vue3 中，可以自行选择使用 Options API 还是使用 Composition API

## Proxy 相对于 Object.defineProperty 有哪些优点？
- 可监听动态新增的属性
- 可以监听删除的属性
- 可以监听数组的索引和 length 属性
- 多层属性嵌套，在访问属性过程中处理下一级属性

## Vue 3.0 在编译方面有哪些优化？
- 支持 Fragments：允许组件有多个根节点
- 静态提升和标记动态节点：通过标记和提升所有的静态结点，使用Patch Flag标记动态节点，diff的时候只需要对比动态节点的内容
- 缓存事件处理函数

## Vue.js 3.0 响应式系统的实现原理？
- 使用 Proxy 代理对象的 get、set、deleteProperty 等操作，在 get 中收集依赖，set、deleteProperty 中触发更新
- 内部维护了一个关系表，键是响应式对象 target，值是 depsMap，这个表是 WeakMap，即 target 被删除时会在表中自动移除
- depsMap 的键是 target 中的属性，值是一个 Set，包含这个属性的所有依赖项，依赖项包装为一个函数 effect，effect 是依赖的更新方式