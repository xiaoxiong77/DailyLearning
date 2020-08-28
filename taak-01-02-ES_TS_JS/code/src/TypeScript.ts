const fn = (name: string) => {
    console.log(name)
}
fn('test')

// Object类型
const foo: object = function () {} // [] // {}
// const obj1: { name: string, age: number } = { name: 'test', age: 10, gender: 'male' }

// 数组类型
const arr1: Array<number> = [1, 2];
const arr2: number[] = [1, 2];

// 元组类型-明确元素数量及类型
const arr3: [number, string] = [1, 'test'];

// 枚举类型
const enum testStatus {
    success = 0,
    error = 1
};

const test = {
    title: 'test',
    status: testStatus.success
};

// -------------------------------------------------------
// 函数类型
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

// 任意类型
function fn5 (value: any) {
    return JSON.stringify(value);
}

// ---------------------------------
// 接口
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


// -------------------------------------------
// 类
class Person {
    public name: string // 公有属性
    private age: number // 私有属性-外部访问不到
    protected readonly gender: boolean = true; // 受保护的-外部访问不到

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