## 请简述 React 16 版本中初始渲染的流程
- render 阶段
    - render 阶段负责创建 Fiber 数据结构并为 Fiber 节点打标记，标记当前 Fiber 节点要进行的 DOM 操作
- commit 阶段
    - commit 阶段负责根据 Fiber 节点标记 effectTag 进行相应的 DOM 操作

## 为什么 React 16 版本中 render 阶段放弃了使用递归
- 因为递归使用 javascript 自身的执行栈，一旦开始就无法停止，直到任务执行完成。如果 virtualDOM 树的层级比较深，virtualDOM 的比对的过程中就无法响应用户操作，无法即时执行元素动画，造成页面卡顿的现象；
- React 16 采用循环模拟递归，而且比对的过程是利用浏览器的空闲时间完成的，不会长期占用主线程，这就解决了 virtualDOM 比对造成页面卡顿的问题

## 请简述 React 16 版本中 commit 阶段的三个子阶段分别做了什么事情
- 第一阶段： before mutation 阶段：
    - 执行 DOM 操作前，调用类组建的 getSnapshotBeforeUpdate 生命周期函数
- 第二阶段： mutation 阶段：
    - 执行 DOM 操作，根据 effectTag 执行 DOM 操作
- 第三阶段：layout 阶段
    - 执行 DOM 操作后，执行渲染完成之后的会点函数

## 请简述 workInProgress Fiber 树存在的意义是什么
- 在双缓存技术中，workInProgress Fiber 树就是即将要显示在页面中的 Fiber 树，当这棵 Fiber 树构建完成之后，React 会直接使用它替换current Fiber 树达到快速更新 DOM 的目的，因为 workInProgress Fiber 树是在内存中构建的所以构建他的速度是非常快的，一旦workInProgress Fiber 树在屏幕上呈现，他就会变成 current Fiber 树