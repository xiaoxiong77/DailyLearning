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