## 当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，它的内部原理是什么
- 不是响应式数据，因为响应式数据是通过Object.defineProperty对已存在的data属性添加相应的setter/getter方法，只有设置了这两个方法，后期修改的时候才会触发依赖收集、更新通知
- 做法：this.dog = {name: 'Trump'}设置，会触发dog的setter方法，会判断dog设置的值是否为对象，如果是对象则会将其继续进行遍历设置为响应式数据

## 请简述 Diff 算法的执行过程
- Diff算法会对新旧节点进行比较，而且比较是同一级的节点的vnode差异，然后将差异部分进行更新
- 在snabbdom中，通过init产生的patch函数，如果传入的新旧vnode key相同且sel相同，则认为是相同的节点，此时会走diff流程进行新旧节点的对比，diff流程主要在patchNode函数与updateChildren中进行。patchNode对比新旧节点之间的差异，并对dom元素进行更新，updateChildren对新旧节点的children（同级元素）进行对比寻找差异，通过patchNode更新dom元素内容，如果有元素移动等，调用dom api进行元素的移动、添加、删除等操作

