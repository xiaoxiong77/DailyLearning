## 请简述 Vue 首次渲染的过程
- 首先进行Vue的初始化，也就是初始化Vue的实例成员以及静态成员
- 当初始化结束之后，开始调用构造函数，在构造函数中调用this._init()，这个方法相当于我们整个Vue的入口
- 在_init()中最终调用了this.$mount()，共有两个$mount()
  - 第一个$mount()是entry-runtime-with-compiler.js入口文件的$mount()。核心作用：把模板编译成render函数。
  - 执行过程：
    - 首先会判断一下我们当前是否传入了render选项，如果没有传入的话，它会去获取我们的template选项
    - 如果template选项也没有的话，会把el中的内容作为模板，然后把模板编译成render函数
    - 通过compileToFunctions()函数，把模板编译成render函数的,当把render函数编译好之后，把render函数存在options.render中
  - 第二个会调用runtime/index.js中的$mount()方法。
    - 首先会重新获取el，因为如果是运行时版本的话，是不会entry-runtime-with-compiler.js这个入口中获取el，所以如果是运行时版本的话，会在runtime/index.js的$mount()中重新获取el
- 调用mountComponent(),是在src/core/instance/lifecycle.js中定义的
  - 首先会判断render选项，如果没有但是传入了模板，并且当前是开发环境的话会发送警告，警告运行时版本不支持编译器
  - 触发beforeMount这个生命周期中的钩子函数，也就是开始挂载之前
  - 定义了updateComponent()，定义了_render和_update，_render的作用是生成虚拟DOM，_update的作用是将虚拟DOM转换成真实DOM，并且挂载到页面上来
- 创建Watcher对象
  - 在创建Watcher时，传递了updateComponent这个函数，这个函数最终是在Watcher内部调用的
  - 在Watcher创建完之后还调用了get方法，在get方法中，会调用updateComponent()
  - 然后触发了生命周期的钩子函数mounted,挂载结束，最终返回Vue实例

## 请简述 Vue 响应式原理
- vue初始化函数中，调用了observe方法，将数据转换成响应式observer对象
  - 包括将对象递归遍历转变成响应式，还要把数组中方法进行重写
- 转换成observer对象过程中，创建getter/setter方法
  - getter方法为每个属性创建dep对象，收集依赖，主要是用来存放watcher
  - setter方法中通过dep派发通知视图调用watcher进行更新

## 请简述虚拟 DOM 中 Key 的作用和好处
- 以便它能够跟踪每个节点的身份，在进行比较的时候，会基于 key 的变化重新排列元素顺序。从而重用和重新排序现有元素，并且会移除 key 不存在的元素。方便让 vnode 在 diff 的过程中找到对应的节点，然后成功复用
- 优化diff算法关于虚拟DOM节点比较过程，提升性能

## 请简述 Vue 中模板编译的过程
- 缓存公共的 mount 函数，并重写浏览器平台的 mount
- 判断是否传入了 render 函数，没有的话，是否传入了 template ，没有的话，则获取 el 节点的 outerHTML 作为 template
- 调用 baseCompile 函数
- 解析器(parse) 将模板字符串的模板编译转换成 AST 抽象语法树
- 优化器(optimize) - 对 AST 进行静态节点标记，主要用来做虚拟 DOM 的渲染优化
- 通过 generate 将 AST 抽象语法树转换为 render 函数的 js 字符串
- 将 render 函数 通过 createFunction 函数转换为一个可以执行的函数
- 将最后的 render 函数挂载到 option 中
- 执行公共的 mount 函数