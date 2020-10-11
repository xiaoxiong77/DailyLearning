# Vue

## 目录结构
### src
- compiler 编译相关 
- core Vue 核心库 
- platforms 平台相关代码 
- server SSR，服务端渲染 
- sfc .vue 文件编译为 js 对象 
- shared 公共的代码

## 打包工具
### Rollup
- Vue.js 源码打包工具使用的是 Rollup，比 Webpack 轻量
- Webpack 把所有文件当做模块，Rollup 只处理 js 文件更适合在 Vue.js 这样的库中使用
- Rollup 打包不会生成冗余的代码

## Vue 不同版本的构建
- 官方文档：https://cn.vuejs.org/v2/guide/installation.html#%E5%AF%B9%E4%B8%8D%E5%90%8C%E6%9E%84%E5%BB%BA%E7%89%88%E6%9C%AC%E7%9A%84%E8%A7%A3%E9%87%8A

### 术语
- 完整版：同时包含编译器和运行时的版本。
- 编译器：用来将模板字符串编译成为 JavaScript 渲染函数的代码，体积大、效率低。
- 运行时：用来创建 Vue 实例、渲染并处理虚拟 DOM 等的代码，体积小、效率高。基本上就是除去编译器的代码。
- UMD：UMD 版本通用的模块版本，支持多种模块方式。 vue.js 默认文件就是运行时 + 编译器的UMD 版本
- CommonJS(cjs)：CommonJS 版本用来配合老的打包工具比如 Browserify 或 webpack 1。
- ES Module：从 2.6 开始 Vue 会提供两个 ES Modules (ESM) 构建文件，为现代打包工具提供的版本。
    - ESM 格式被设计为可以被静态分析，所以打包工具可以利用这一点来进行“tree-shaking”并将用不到的代码排除出最终的包。
    - ES6：https://es6.ruanyifeng.com/#README

### Runtime + Compiler vs. Runtime-only
```
// Compiler 
// 需要编译器，把 template 转换成 render 函数 
// const vm = new Vue({ 
    // el: '#app', 
    // template: '<h1>{{ msg }}</h1>', 
    // data: { 
        // msg: 'Hello Vue' 
        // } 
        // }) 
// Runtime 
// 不需要编译器 
const vm = new Vue({ 
    el: '#app', 
    render (h) { return h('h1', this.msg) },
    data: { msg: 'Hello Vue' } }) 
```
- 推荐使用运行时版本，因为运行时版本相比完整版体积要小大约 30%
- 基于 Vue-CLI 创建的项目默认使用的是 vue.runtime.esm.js
    - 通过查看 webpack 的配置文件
    ```
    vue inspect > output.js
    ```

## 入口文件
- src/platform/web/entry-runtime-with-compiler.js

### 查看源码，若同时存在 template 和 render，渲染结果？
```
// 如果同时设置template和render此时会渲染什么？--> 只会渲染render中的内容
const vm = new Vue({
    el: '#app',
    template: '<h1>Hello Template</h1>',
    render(h) {
    return h('h1', 'Hello Render')
    }
})
``` 
- el 不能是 body 或者 html 标签
- 如果没有 render，把 template 转换成 render 函数
- 如果有 render 方法，直接调用 mount 挂载 DOM
```
// el 不能是 body 或者 html
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
    )
    return this
  }

  const options = this.$options
  // resolve template/el and convert to render function
  // 把 template/el 转换成 render 函数
  if (!options.render) {
    // 把 template/el 转换成 render 函数
    
  }
  // 调用 mount 方法，渲染 DOM
  return mount.call(this, el, hydrating)
}
```