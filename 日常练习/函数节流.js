/**
 * 函数节流
 * 定义：不管事件触发频率有多高，只在单位时间内执行一次
 * 思路：使用时间戳或者定时器
 */

/**
 * 函数节流-时间戳版
 * @param {function} fn 需要执行的函数
 * @param {number} wait 执行的间隔时间
 */
const throttle1 = (fn, wait) => {
    let pervious = 0
    return (...args) => {
        // 当前时间戳减去之前的时间戳，差值大于 wait 时间间隔，就可以执行函数
        if (Date.now() - pervious > wait) {
            pervious = Date.now()
            fn.apply(this, args)
        }
    }
}

const throttle2 = (fn, wait) => {
    let timer = null
    return (...args) => {
        // 判断如果定时器不存在就可以执行
        if (!timer) {
            // 设置下一个定时器
            timer = setTimeout(() => {
                // 然后执行函数，清空定时器
                timer = null
                fn.apply(this, args)
            }, wait)
        }
    }
}