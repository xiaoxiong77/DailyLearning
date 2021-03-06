## 函数式编程的由来
- 函数式编程可以抛弃this
- 打包过程中可以更好地利用tree shaking 过滤无用的代码
- 方便测试、方便并行处理
- 帮助进行函数式开发的库：lodash/underscore/ramda

## 编程范式
### 面向过程编程

### 面向对象编程
- 把现实世界中的事物抽象成程序世界中的类和对象，通过封装、继承和多态来演示事物事件的联系
- 
### 函数式编程（对运算过程抽象）
- 把现实世界中的事物和事物之间的联系抽象到程序世界中
   - 函数式编程中的函数指的不是程序中的函数，而是数学中的函数即映射关系
   - 相同的输入要得到相同的输出`【纯函数】`
   - 函数式编程用来描述数据（函数）之间的映射
   - `函数式编程不能提高程序的性能，因为大量使用闭包在某种程度上会降低性能（占用内存）`
```js
// 非函数式
var a = 1;
var b = 2'
var sum = a + b;

// 函数式
function sum(a, b) {
    return a + b;
}
var result = sum(1, 2);
```

## 函数是一等公民
- 函数可以存储在变量中
- 函数作为参数
- 函数作为返回值
  
## 高阶函数
- 可以把函数作为参数传递给另一个函数
- 可以把函数作为另一个函数的返回结果
- 使用高阶函数的意义
    - 抽象可以帮我们屏蔽细节，只需要关注我们的目标
    - 高阶函数是用来抽象通用的问题
- 常用高阶函数：forEach/map/filter/every/reduce...
```js
//forEach
const forEach = (array, fn) => {
    for (let i = 0; i< array.length; i++) {
        fn(array[i])
    }
}

//map
const map = (array, fn) => {
    let newArray = [];
    for (value of array) {
        newArray.push(fn(value))
    }
    return newArray;
}
```
  
## 闭包
- 可以在另一个作用域中调用一个函数内部的函数并访问到该函数的作用域中的成员
- 本质：函数执行时会放到一个执行栈上，当函数执行完毕会从栈上移除，但是堆上的作用域成员因为被外部引用不能释放，因此内部函数依然可以访问外部函数的成员
```js
function getSalary (base) {
    return function (merit) {
        return base + merit;
    }
}

let base = getSalary(12000);
console.log(base(2000))
console.log(base(3000))
```

## 纯函数
- 相同的输入始终得到相同的输出，而且没有任何可观察的副作用
    - 类似于数学中的函数
    - `副作用会让一个函数变得不纯，但是副作用不可避免（会依赖到外部），只能最大程度去控制它在可控范围内发生`
    - lodash：纯函数功能库
```js
let array = [1, 2, 3];

//slice是纯函数
array.slice(0, 2) // => [1, 2]
array.slice(0, 2) // => [1, 2]
array.slice(0, 2) // => [1, 2]

//splice是不纯的函数
array.splice(1, 2) // => [1, 2]
array.splice(1, 2) // => [3]
array.splice(1, 2) // => []
```
- 纯函数的好处
    - 可缓存
    - 可测试
    - 并行处理

## 柯里化
- 当一个函数有多个参数，先传递一部分参数调用它（这部分参数以后不会发生改变），然后返回一个新的函数接收剩余的参数，返回结果
```js
//需要柯里化的函数
function getSum (a, b, c) { 
    return a + b + c 
}

//柯里化
function curry (fn) {
    return function curryfn (...args) {
        if (args.length < fn.length) {
            return function (...arguments) {
                return curryfn(...args,...arguments)
            }
        }
        return fn(...args);
    }
}

let curried = curry(getSum);
console.log(curried(1)(2,3))
```
- 也是高阶函数
- 是一种对函数参数的缓存
- 让函数变得更灵活、颗粒度更小
- 可以把多元函数转换成一元函数，可以组合使用函数产生强大的功能

## 函数组合
- 如果一个函数要经过多个函数处理才能达到最终结果，这个时候可以把中间过程的函数合并成一个函数
    - 函数就像是数据的管道，函数组合就是把这些管道连接起来，让数据穿过多个管道形成最终结果
    - `函数组合默认从右到左执行`
    - 需要满足结合律
    - `通过函数组合可以把多个一元函数组合成一个功能更强大的函数`
```js
const fp = require('lodash/fp');

const array = ['abc', 'def', 'egh'];

//纯函数和柯里化很容易写出洋葱代码
//比如获取数组的最后一个元素再转换成大写字母
const result = fp.toUpper(fp.first(fp.reverse(array)));
console.log(result)

//函数组合可以让我们把细粒度的函数重新组合生成一个新的函数
const composeFn = fp.flowRight(fp.toUpper, fp.first, fp.reverse)
console.log(composeFn(array))

//模拟flowRight
const flowRight = (...fns) => {
    return (value) => {
        return fns.reverse().reduce((prevValue, currentFn) => {
            return currentFn(prevValue)
        }, value)
    }
}

const composeFn2 = flowRight(fp.toUpper, fp.first, fp.reverse)
console.log(composeFn2(array))

```