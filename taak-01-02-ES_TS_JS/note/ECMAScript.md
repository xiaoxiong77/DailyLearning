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

### Proxy/defineProperty
- Proxy：能够监视到更多对象操作
    - Proxy是以非侵入的方式监管了对象的读写
    - 更好的支持数组对象的监视
- object.defineProperty：只能监听对象的读写操作
```
const obj = {
    name: 'aaa',
    age: 18
};

const objProperty = new Proxy(obj, {
    get (target, property) {
        return target[property] ? target[property] : 'undefined';
    },
    set (target, property, value) {
        target[property] = value;
    },
    deleteProperty (target, property) {
        delete target[property];
    }  
})

console.log(objProperty.name) // 读
objProperty.age = 20; // 写
delete objProperty.name; // 删除
```

### Reflect
- 属于静态类
- 内部封装了一系列对对象的底层操作，统一提供了一套用于操作对象的API
- Proxy内部方法的默认实现
```
const obj = {
  name: 'zce',
  age: 18
}

// console.log('name' in obj)
// console.log(delete obj['age'])
// console.log(Object.keys(obj))

console.log(Reflect.has(obj, 'name')) // 判断是否有该属性
console.log(Reflect.deleteProperty(obj, 'age')) // 删除某个属性
console.log(Reflect.ownKeys(obj)) // 查看所有属性
```

### Set数据结构
- 内部成员不会重复，重复值会被忽略
- 添加数据可以使用add方法，可以链式调用
- 常用场景：数组去重
```
const s = new Set()

s.add(1).add(2).add(3).add(4).add(2)

console.log(s.size) // 获取长度

console.log(s.has(100)) // 判断是否存在某个值

console.log(s.delete(3)) // 删除某项

s.clear() // 清除

// 应用场景：数组去重
const arr = [1, 2, 1, 3, 4, 1]
const result = new Set(arr);
console.log(result)
```

### Map数据结构
- 通常对象的key会被自动转换为字符串，而Map可以使用任意类型的数据作为key

### Symbol
- 表示一个独一无二的值
- 最主要的作用就是为对象添加独一无二的属性名
- 静态方法Symbol.for可以用来获取相同的Symbol
- Symbol类型的属性名无法通过for in/Object.keys方法获取，JSON.stringfy方法会忽略对象里Symbol类型的属性
- 通过Obejct.getOwnPropertySymbols()方法可以获取到对象里面Symbol类型的属性名
```
// 使用 Symbol 为对象添加用不重复的键
const obj = {}
obj[Symbol()] = '123'
obj[Symbol()] = '456'
console.log(obj)

// 也可以在计算属性名中使用
const obj = {
   [Symbol()]: 123
};

const s1 = Symbol.for('foo')
const s2 = Symbol.for('foo')
console.log(s1 === s2) // false

// 模拟私有变量
const name = Symbol();
const person = {
  [name]: 'zce',
  say () {
    console.log(this[name])
  }
};
persson.say();
```

### for of
- 遍历所有数据结构的统一方式
- 相比于forEach，可以使用break终止循环
- Set和Map对象都可以用for of遍历

### 可迭代接口
- 实现了Iterable接口的数据，才能被for of
    - 接口内部有一个next函数方法，该函数返回一个对象{value: any,done: Boolean}
```
const obj = {
  store: ['foo', 'bar', 'baz'],

  [Symbol.iterator]: function () {
    let index = 0
    const self = this

    return {
      next: function () {
        const result = {
          value: self.store[index],
          done: index >= self.store.length
        }
        index++
        return result
      }
    }
  }
}

for (const item of obj) {
  console.log(item)
}
```