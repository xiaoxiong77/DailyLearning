## 语言类型
### 类型安全维度-强类型和弱类型
- 强类型：语言层面限制实参与形参必须一致，不允许有任意的隐式类型转换
- 弱类型：语言层面不会限制实参类型，几乎没有什么约束，允许隐式类型转换

### 类型检查维度-静态类型和动态类型
- 静态类型：一个变量声明时类型就是明确的，声明之后类型不允许修改
- 动态类型：运行阶段才能够明确变量类型，且类型可以随时变化
- 动态类型的变量是没有类型的，变量的值才有类型

### 弱类型的问题
- 代码的错误只有在代码运行时才会被发现
- 函数参数类型不明确，导致函数功能发生改变等

### 强类型的优势
- 错误更早暴露
- 代码更智能，编码更准确
- 重构更牢靠
- 减少不必要的类型判断

## Flow（Javascript的类型检查器）
### 快速上手
- 官网：https://flow.org/en/docs/types/
- 第三方类型手册：https://www.saltycrane.com/cheat-sheets/flow-type/latest/
- 安装：yarn add flow-bin 
- 添加flow配置文件：yarn flow init
- 使用的时候：文件顶部添加//@flow 标记
- 执行flow命令校验对应文件：yarn flow
- 停止flow后台任务：yarn flow stop
- 编译移除注解：yarn flow-remove-types . -d dist
- 使用babel编译
    - yarn add @babel/core @babel/cli @babel/preset-flow --dev
    - 添加配置文件.babelrc{"presets": ["@babel/preset-flow"]}
    - 编译执行：yarn babel src -d dist
- flow开发工具插件
    - vacode 插件安装：Flow Language Support

### 支持类型
- 原始类型
    - string
    - number
    - boolean
    - null
    - undefined（void表示）
    - symbol
- 数组类型: Array
```
// 定义一个元素都为数字类型的数组
const arr1: Array<number> = [1, 2];
const arr2: number[] = [1, 2];
// 元组
const test: [string, number] = ['1', 100];
```
- 对象类型
```
const obj1: {a: string, b: number} = {a: 'test', b: 100};
const obj2: {a?: string, b: number} = {b: 100};// ?表示该元素可有可无
const obj3: { [string]: string } = {};// 对象键的名为字符串，值也为字符串
obj3.key = 'name';
```
- 函数类型
```
// 函数参数定义类型
function fn1 (a: number, b: number) {
    return a + b;
}

// 函数返回值定义类型
function fn2 (): number {
    return 100;
}

// 函数回调函数类型定义:参数类型为string和number，没有返回值的函数
function fn3 (callback: (string, number) => void) {
    callback('test', 100);
}
```
- 特殊类型
```
// 字面量类型
const w: 'test' = 'test';

// 联合类型（或类型）
const type: 'success' | 'warning' | 'danger' = 'danger';// 只能存放三者值之一

// 使用type单独声明一个类型
type StringOrNumber = string | number;
const q: StringOrNumber = 'test';

// maybe类型，在基础类型之上扩展了null和undefined
const age1: number = 10;
const age2: ?number = null;

// mixed类型或者any类型（任意类型）
// mixed类型时强类型，any时弱类型
function fn4 (value: mixed) {

}
function fn5 (value: any) {

}
```

## TypeScript
### 安装
- yarn add typescript
- 编译：yarn tsc 文件名
- 配置文件：yarn tsc --init

### 支持类型
- 原始类型
    - string
    - number
    - boolean
    - null
    - undefined（void表示）
    - symbol
- Object类型
```
const foo: object = function () {} // [] // {}
// const obj1: { name: string, age: number } = { name: 'test', age: 10, gender: 'male' }
```
- 数组类型
```
const arr1: Array<number> = [1, 2];
const arr2: number[] = [1, 2];
```
- 元组类型
```
// 元组类型-明确元素数量及类型
const arr3: [number, string] = [1, 'test'];
```
- 枚举类型
    - 使用enum关键字声明枚举值
    - 内部属性的值如果没有复赋值，则会默认累加
    - 字符串枚举需要明确初始化值
```
const enum testStatus {
    success = 0,
    error = 1
};

const test = {
    title: 'test',
    status: testStatus.success
};
```
- 函数类型
    - 可选参数和默认参数都需要在参数列表的最后
```
function fn1 (a: number, b: number) : string {
    return 'test';
};
fn1(100, 200);

// 可选参数
function fn2 (a: number, b?: number) : string {
    return 'test';
};

// 默认参数
function fn3 (a: number, b: number = 7) : string {
    return 'test';
};

// 任意个数的参数
function fn4 (a: number, b: number, ...rest: number[]) : string {
    return 'test';
};
```
- 任意类型：any 弱类型

### TypeScript接口（interface）
- 常用来约定一个对象中具体有什么成员
```
interface Test {
    name: string,
    age: number
}

function fn6 (obj: Test) {
    //
}
fn5({name: 'test', age: 10})

// 可选成员
interface Test1 {
    name: string,
    age: number,
    gender?: string // 可选
}

function fn7 (obj: Test) {}

// 只读成员
interface Test2 {
    name: string,
    age: number,
    readonly hobby: string //只读-初始化完成后就不可再修改
}

function fn8 (obj: Test) {}

// 动态成员
interface Test3 {
    [prop: string]: string
}

const test3: Test3 = {};
test3.name = 'test';
```

### TypeScript类
- 用来描述一类具体对象的抽象成员
- ES6以前，函数+原型模拟实现类
- ES6以后有了专门的class
- TypeScript增强了class的相关语法
```
class Person {
    public name: string // 公有属性
    private age: number // 私有属性-外部访问不到
    protected readonly gender: boolean = true; // 受保护的-外部访问不到，但可以被继承

    constructor (name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

// 类和接口
interface Eat {
    eat (food: string): void
  }
  
  interface Run {
    run (distance: number): void
  }
  
  class Person1 implements Eat, Run {
    eat (food: string): void {
      console.log(`优雅的进餐: ${food}`)
    }
  
    run (distance: number) {
      console.log(`直立行走: ${distance}`)
    }
  }
  
  class Animal implements Eat, Run {
    eat (food: string): void {
      console.log(`呼噜呼噜的吃: ${food}`)
    }
  
    run (distance: number) {
      console.log(`爬行: ${distance}`)
    }
}

// 抽象类-关键字abstract定义抽象类，只能被继承无法被创建实例
abstract class Animal1 {
  eat (food: string): void {
    console.log(`呼噜呼噜的吃: ${food}`)
  }

  abstract run (distance: number): void
}

class Dog extends Animal1 {
  run(distance: number): void {
    console.log('四脚爬行', distance)
  }

}

const d = new Dog()
d.eat('嗯西马')
d.run(100)
```

### 泛型
- 声明时不指定具体类型，调用时传递具体类型
- <T>表示
```
function createNumberArray (length: number, value: number): number[] {
  const arr = Array<number>(length).fill(value)
  return arr
}

function createStringArray (length: number, value: string): string[] {
  const arr = Array<string>(length).fill(value)
  return arr
}

function createArray<T> (length: number, value: T): T[] {
  const arr = Array<T>(length).fill(value)
  return arr
}

// const res = createNumberArray(3, 100)
// res => [100, 100, 100]

const res = createArray<string>(3, 'foo')
```