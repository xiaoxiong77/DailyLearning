// @flow

function sum (a: number, b: number) {
    return a + b;
}

sum(100, 100);
// sum('100', 100);

let a: number = 100;

function foo (): number {
    return 100;
}

// -------------------------------------------
// 定义一个元素都为数字类型的数组
const arr1: Array<number> = [1, 2];
const arr2: number[] = [1, 2];
// 元组
const test: [string, number] = ['1', 100];


const obj1: {a: string, b: number} = {a: 'test', b: 100};
const obj2: {a?: string, b: number} = {b: 100};// ?表示该元素可有可无
const obj3: { [string]: string } = {};// 对象键的名为字符串，值也为字符串
obj3.key = 'name';


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