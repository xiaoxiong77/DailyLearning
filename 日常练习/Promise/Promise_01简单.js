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

    resolve = (value) => {
        // 如果状态不是等待，阻止程序向下执行
        if (this.status !== PENDING) return

        // 将状态更改为成功
        this.status = FULFILLED

        // 保存成功之后的值
        this.value = value
    }

    reject = (reason) => {
        // 如果状态不是等待，阻止程序向下执行
        if (this.status !== PENDING) return

        // 将状态更改为失败
        this.status = REJECTED

        // 保存失败后的原因
        this.reason = reason
    }

    then = (successCallback, failCallback) => {
        // 判断状态
        if (this.status === FULFILLED) {
            successCallback(this.value)
        } else if (this.status === REJECTED) {
            failCallback(this.reason)
        }
    }
}