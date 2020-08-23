## ECMAScript新特性
### 概述
- 通常把ECMAScript看做JavaScript的标准化规范，它只提供了基本的语法
- 浏览器环境中的 javascript => ECMAScript + DOM + BOM
- node环境中的 javascript => ECMAScript + fs + net + etc.
- ES2015之后的版本开始按照年份命名
- ES6可以特质ES2015，也可以泛指ES2015之后的所有版本

### ES2015主要变化
- 解决原有语法上的一些问题或不足
- 对原有语法进行增强
- 全新的对象、全新的方法、全新的功能
- 全新的数据类型和数据结构

## ES5新方法
### let/const与块级作用域
- 作用域：某个成员能够起作用的范围
    - 包括全局作用域、函数作用域、块级作用域
- let/const定义的都是块级作用域，只在声明的代码块内生效
- var声明的变量，会进行变量提升，let/const不会（先使用再声明会报错）
```
// 比如变量a未先声明，但是不会报错
console.log(a); // undefined
var a = 'test';
```
- let：定义变量
- const：定义常量，不能修改，并且声明的时候必须要有初始值
    - `指的并不是不能修改常量中的属性成员，而是不能重新再指向一个新的内存地址` 
```
const obj = {};
obj.name = 'a'; // 是可以的，并没有改变其内存地址指向
obj = {}; // 报错
```

### 数组的解构
```
const arr = [1, 2, 3];
const [a, ...rest] = arr; // => 1 [2, 3]
const [, , c] = arr; // =? 3
const [a, b, c = 7] = arr; // => 1 2 7
```

### 对象的解构
```
const obj = { name: 'test'};
// const { name } = obj;
const { name: newName } = obj;
console.log(newName); // => test
const { age = 20 } = obj;
console.log(age) // => 20（相当于设置默认初始值）
```

### 模板字符串
```
let num = 5;
const str = `hello ${1 + 2} ${num}`;
```

### 字符串扩展方法
- includes：包含
- startWidth：以某个字符起始
- endWidth：以某个字符结尾

### 参数默认值
- 当函数没有传递实参或者实参为undefined时，使用默认值
- 如果函数有多个参数，带有默认值的形参一定是放在参数列表的最后面的
```
const fn = (m, n = 1) => {
    console.log(m, n); // => 2, 1
};
fn(2);
```

### 剩余参数
- arguments：接收到的参数是一个伪数组
- ...args：只能出现再形参列表的最后且只能使用一次
```
const fn = (...args) => {
    console.log(args); // => [1,2,3]
}
fn(1,2,3);
```

### 展开数组
```
const arr = [1, 2, 3];
console.log(...arr); => 1 2 3
```

### 箭头函数
- 不会改变this指向
    - `普通函数的this：指向它的直接调用者，没有就指向window`
    - `箭头函数的this：本身是没有this机制的，默认指向定义它时，所处上下文对象的this指向`
```
const obj2 = {
    name: 'test',
    say: function () {
        console.log(this); // => obj2
    },
    say2: () => {
        console.log(this); // => window
    },
    sayAsync: () => {
        setTimeout(() => {
            console.log(this) // => window
        }, 1000)
    },
    sayAsync2: function () {
        setTimeout(() => {
            console.log(this) // => obj2
        }, 1000)
    },
    sayAsync3: function () {
        setTimeout(function () {
            console.log(this) // => window
        }, 1000)
    }
};

obj2.say();
obj2.say2();
obj2.sayAsync();
obj2.sayAsync2();
obj2.sayAsync3();


const obj3 = {
    sayAsync: function () {
        setTimeout(() => {
            console.log(this) // => window
        }, 1000)
    }
}
const test = obj3.sayAsync;
test();
```

### 对象字面量

### 对象扩展方法
- Object.assign：将多个源对象中的属性复制到一个目标对象中
```
const oringin = {
    a: 1,
    b: 2
};
const target = {
    a: 3,
    c: 4
}
const reuslt = Object.assign(taregt, origin);
console.log(result === target ); // => true
```