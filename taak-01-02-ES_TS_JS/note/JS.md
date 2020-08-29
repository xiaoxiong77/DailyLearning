## 性能优化

### JavaScript内存管理
- 内存：由可读写单元组成，表示一片可操作空间
- 管理：人为的去操作一片空间的申请、使用和释放
- 内存管理：开发这主动申请空间、使用空间、释放空间
- 管理流程：申请->使用->释放

### JavaScript垃圾回收
- 对象不再被引用时
- 对象不能从根本上访问到时

### JavaScript的可达对象
- 可以访问到的对象(引用、作用域链)
- 可达的标准就是从根本出发是否能够被找到
- Javascript中的根可以理解为时全局变量

### GC算法
- GC：垃圾回收的简写[实现内存空间的良性循环]
    - 可以找打内存中的垃圾、并释放和回收空间
    - GC里的垃圾：程序中不再需要使用的对象；程序中不能再访问到的对象
- GC就是一种垃圾回收机制，工作内容就是查找垃圾、释放空间、回收空间
- 算法就是工作时查找和回收所遵循的规则

### 常见的GC算法
#### 引用计数
- 核心思想：设置引用数，判断当前引用数是否为0
- 引用关系改变时修改引用数字，当其为0时立即回收
- 优点：
    - 发现垃圾时立即回收
    - 最大限度减少程序暂停
- 缺点：
    - 无法回收循环引用对象
    - 时间开销大

#### 标记清除算法
- 核心思想：标记、清除两个阶段
- 过程：遍历所有对象找标记活动对象->遍历所有对象清除没有标记对象->回收相应空间
- 优点
    - 可以对循环引用的对象进行内存释放
- 缺点
    - 释放地址不连续，造成空间碎片化
    - 不会立即回收垃圾对象

#### 标记整理算法
- 可以看做标记清除的增强
- 标记阶段的操作和标记清除一致
- 操作阶段会先执行整理，移动对象位置
- 优点
    - 减少碎片化空间
- 缺点
    - 不会立即回收垃圾对象

### V8
- 是一款主流的JavaScript执行引擎
- 采用即时编译
- 内存设限
- 垃圾回收策略
    - 采用分代回收（新生代、老生代），不同代对象采用不同算法
    - 新生代区域垃圾回收使用空间换时间
    - 老生代区域垃圾回收不适合复制算法
- 常用GC算法
    - 分代回收、空间复制、标记清除、标记整理、标记增量
- 内存分配
    - 小空间用于存储新生代对象（32M || 16M）- 存活时间比较短的对象

### 代码优化
- 慎用全局变量
    - 全局变量定义在全局执行上下文，是所有作用域链的顶端
    - 全局执行上下文一致存在于上下文执行栈，不会被垃圾回收，直到程序退出
- 缓存全局变量
    - 将使用中无法避免的全局变量缓存到局部
    - 可以提高js代码执行性能
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>缓存全局变量</title>
</head>
<body>
  <input type="button" value="btn" id="btn1">
  <input type="button" value="btn" id="btn2">
  <input type="button" value="btn" id="btn3">
  <input type="button" value="btn" id="btn4">
  <p>1111</p>
  <input type="button" value="btn" id="btn5">
  <input type="button" value="btn" id="btn6">
  <p>222</p>
  <input type="button" value="btn" id="btn7">
  <input type="button" value="btn" id="btn8">
  <p>333</p>
  <input type="button" value="btn" id="btn9">
  <input type="button" value="btn" id="btn10">

  <script>
    function getBtn() {
      let oBtn1 = document.getElementById('btn1')
      let oBtn3 = document.getElementById('btn3')
      let oBtn5 = document.getElementById('btn5')
      let oBtn7 = document.getElementById('btn7')
      let oBtn9 = document.getElementById('btn9')
    }

    function getBtn2() {
      let obj = document // 缓存起来
      let oBtn1 = obj.getElementById('btn1')
      let oBtn3 = obj.getElementById('btn3')
      let oBtn5 = obj.getElementById('btn5')
      let oBtn7 = obj.getElementById('btn7')
      let oBtn9 = obj.getElementById('btn9')
    }
  </script>

</body>
</html>
```
- 通过原型对象添加附加方法
    - 在原型对象上添加实例方法比直接在构造函数内部添加方法执行效率要高
```

var fn1 = function() {
  this.foo = function() {
    console.log(11111)
  }
}

let f1 = new fn1()


var fn2 = function() {}
fn2.prototype.foo = function() {
  console.log(11111)
}

let f2 = new fn2()
```
- 避开闭包陷阱
    - 闭包使用不当很容易出现内存泄漏
- 避免属性访问方法使用
    - JS不需要属性的访问方法，所有属性都是外部可见的
    - 使用属性访问方法只会增加一层冲定义，没有访问的控制力
```

function Person() {
  this.name = 'icoder'
  this.age = 18
  this.getAge = function() {
    return this.age
  }
}

const p1 = new Person()
const a = p1.getAge() // 通过属性访问方法



function Person2() {
  this.name = 'icoder'
  this.age = 18
}
const p2 = new Person2()
const b = p2.age // 直接访问属性
```
- For循环优化
```
var arrList = [1, 2, 3, 4, 5, 6, 7]

for (var i = 0; i < arrList.length; i++) {
  console.log(11111)
}
// 提前获取长度
for (var i = 0; let length = arrList.length; i < length; i++) {
  console.log(11111)
}
```
- 选择最优的循环方法
```
var arrList = new Array(1, 2, 3, 4, 5)
// 性能最好
arrList.forEach(function(item) {
  console.log(item)
})

for (var i = arrList.length; i; i--) {
  console.log(arrList[i])
}

for (var i in arrList) {
  console.log(arrList[i])
}
```
- 优化节点添加
    - 节点的添加操作必然会有回流和重绘
    - 利用文档碎片进行优化
    - 利用克隆进行优化
```
// 文档碎片优化
for (var i = 0; i < 10; i++) {
    var oP = document.createElement('p')
    oP.innerHTML = i 
    document.body.appendChild(oP)
}

const fragEle = document.createDocumentFragment()// 文档碎片
for (var i = 0; i < 10; i++) {
    var oP = document.createElement('p')
    oP.innerHTML = i 
    fragEle.appendChild(oP)
}
document.body.appendChild(fragEle)

// 克隆优化
for (var i = 0; i < 3; i++) {
    var oP = document.createElement('p')
    oP.innerHTML = i 
    document.body.appendChild(oP)
}

var oldP = document.getElementById('box1')
for (var i = 0; i < 3; i++) {
    var newP = oldP.cloneNode(false) // 克隆
    newP.innerHTML = i 
    document.body.appendChild(newP)
}
```
- 直接量替换object操作
```
var a = [1, 2, 3] // 字面量替换new Array

var a1 = new Array(3)
a1[0] = 1
a1[1] = 2
a1[2] = 3
```
