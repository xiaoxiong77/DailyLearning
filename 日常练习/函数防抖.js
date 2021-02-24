/**
 * 函数防抖
 * 
 * 思路：返回一个函数；每次触发事件时都取消之前的定时器
 * 
 * 使用场景：
 * 使用到一些高频触发的函数，比如 resize/scroll/mousemove/mousehover等；
 * 搜索输入框，在输入后200毫秒搜索
 */

/**
 * 函数防抖
 * @param {function} fn 需要执行的函数
 * @param {number} wait 延迟执行的时间
 * @param {boolean} immediate 是否立即执行
 */
const debounce = (fn, wait, immediate) => {
    // 立即执行：触发事件后函数会立即执行，然后 n 秒内不触发事件才能继续执行函数
    // 非立即执行：触发事件后函数不会立即执行，而是在 n 秒后执行，如果在 n 秒内又触发了事件，则会重新计算函数执行时间
    let timer = null
    return (...args) => {
        if (timer !== null) {
            clearTimeout(timer)
        }
        if (immediate) {
            let callNow = !timer
            timer = setTimeout(() => {
                timer = null
            }, wait)
            if (callNow) fn.apply(this, args)
        } else {
            timer = setTimeout(() => {
                fn.apply(this, args)
            }, wait)
        }
    }
}

// 例子
function handle () {
    console.log(Math.random())
}
window.addEventListener('mousemove', debounce(handle, 1000, false))