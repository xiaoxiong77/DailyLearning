const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

/**
 * 1）Promise类，接收一个立即执行的函数
 * 2）该函数有两个参数，resolve/reject函数，
 *    - 用来改变状态pending/fulfilled/rejected
 *    - 并且赋值-> 成功的值和失败信息
 * 3）then方法调用，接收一个成功回调函数和一个失败回调函数，该函数各自都有一个参数=>表示相应的成功的值和失败的原因
 */
class MyPromise {

  constructor (fn) {
    fn(this.resolve, this.reject);
  }

  // 状态
  status = PENDING;
  // 成功值
  value = undefined;
  // 失败信息
  error = undefined;
  // 成功回调函数数组
  successCallbackArr = [];
  // 失败回调函数数组
  failedCallbackArr = [];

  resolve = (value) => {
    if (this.status !== PENDING) return;
    // 更改状态
    this.status = FULFILLED;
    // 存储成功值
    this.value = value;
    // 成功回调函数数组调用
    while (this.successCallbackArr.length) this.successCallbackArr.shift()();
  }

  reject = (error) => {
    if (this.status !== PENDING) return;
    // 更改状态
    this.status = REJECTED;
    // 存储成功值
    this.error = error;
    // 失败回调函数数组调用
    while (this.failedCallbackArr.length) this.failedCallbackArr.shift()();
  }

  then = (successCallback, failedCallback) => {
    return new MyPromise ((resolve, reject) => {
      if (this.status === FULFILLED) { //状态成功，立马调用成功回调
        // successCallback(this.value);
        const result = successCallback(this.value);
        resolve(result);
      } else if (this.status === REJECTED) { //状态失败，立马调用失败回调
        // failedCallback(this.error);
        const result = failedCallback(this.error);
        resolve(result);
      } else {
        // 如果resolve/reject是异步的，那么then里面的回调函数就不会立即执行
        // 需要先存储起来，等resolve/reject调用以后，再依次调用
        this.successCallbackArr.push(() => {
          const result = successCallback(this.value);
          resolve(result);
        });
        this.failedCallbackArr.push(() => {
          const result = failedCallback(this.value);
          resolve(result);
        });
      }
    })
  }
}

module.exports = MyPromise;