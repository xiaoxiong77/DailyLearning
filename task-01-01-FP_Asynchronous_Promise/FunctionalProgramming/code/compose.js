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