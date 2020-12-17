// 手写 Promise 源码
/*
    1）Promise 是一个类，在执行这个类的时候，需要传递一个执行器进去，并且执行器会立即执行
    2）Promise 中有三种状态，分别为 成功 fulfilled 失败 rejected 等待 pending
       pending -> fulfilled / pending -> rejected [一旦状态确定，就不可更改]
    3）resolve 和 reject 函数是用来更改状态的
       resolve: fulfilled / reject: rejected
    4）then 方法内部做的事情是判断状态，如果状态是成功，调用成功的回调函数；如果状态是失败，调用失败的回调函数
       then 方法是被定义在原型对象中的
    5）then 成功回调有一个参数，表示成功之后的值
       then 失败回调有一个参数，表示失败的原因
    6）异步逻辑/ then 方法多次调用的实现：需要一个变量存储回调函数，然后统一依次调用
    7）then 方法链式调用，那么每一个then 方法都需要返回一个 Promise
*/

// 三个状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
    constructor (executor) {
        executor(this.resolve, this.reject)
    }

    // promise 初始状态
    status = PENDING
    // 成功之后的值
    value = undefined
    // 失败后的原因
    reason = undefined
    // 成功回调
    successCallback = []
    // 失败回调
    failCallback = []

    resolve = (value) => {
        // 如果状态不是等待，阻止程序向下执行
        if (this.status !== PENDING) return

        // 将状态更改为成功
        this.status = FULFILLED

        // 保存成功之后的值
        this.value = value

        // 判断成功回调是否存在，如果存在就调用
        while (this.successCallback.length) this.successCallback.shift()(this.value)
    }

    reject = (reason) => {
        // 如果状态不是等待，阻止程序向下执行
        if (this.status !== PENDING) return

        // 将状态更改为失败
        this.status = REJECTED

        // 保存失败后的原因
        this.reason = reason

        // 判断失败回调是否存在，如果存在就调用
        while (this.failCallback.length) this.failCallback.shift()(this.reason)
    }

    then = (successCallback, failCallback) => {
        let promise2 = new MyPromise((resolve, reject) => {
            // 判断状态
            if (this.status === FULFILLED) {
                setTimeout(() => { // 为了获取到 promise2，将此处的同步代码变成异步
                    let x = successCallback(this.value)
                    // 判断 x 的值是普通值还是 promise 对象
                    // 如果是普通值，直接调用 resolve
                    // 如果是 promise 对象，查看 promise 对象返回的结果，再根据该结果决定调用 resolve 还是调用 reject
                    resolvePromise(promise2, x, resolve, reject)
                }, 0)
            } else if (this.status === REJECTED) {
                failCallback(this.reason)
            } else { // 状态是等待的情况
                // 将成功回调和失败回调存储起来
                this.successCallback.push(successCallback)
                this.failCallback.push(failCallback)
            }
        })
        return promise2
    }
}

function resolvePromise(promise2, value, resolve, reject) {
    if (promise2 === value) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if (value instanceof MyPromise) { // promise 对象
        // value.then(res => {
        //     resolve(res)
        // }, error => {
        //     reject(error)
        // })
        value.then(resolve, reject)
    } else { // 普通值
        resolve(value)
    }
}