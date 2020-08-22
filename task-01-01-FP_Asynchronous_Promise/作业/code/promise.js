const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

/**
 * 1）Promise类，接收一个立即执行的函数
 * 2）该函数有两个参数，resolve/reject函数，
 *    - 用来改变状态pending/fulfilled/rejected
 *    - 并且赋值-> 成功的值和失败信息
 * 3）then方法调用，接收一个成功回调函数和一个失败回调函数，该函数各自都有一个参数=>表示相应的成功的值和失败的原因
 * 4）then方法可多次调用
 * 5）then方法可链式调用（返回Promise）
 */
class MyPromise {

  constructor (fn) {
    try {
      fn(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
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
    // then里面的回调可以不传，默认透传上一个Promise的返回值
    successCallback = successCallback ? successCallback : value => value;
    failedCallback = failedCallback ? failedCallback: error => { throw error };

    // 可链式调用，所以返回一个Promise
    let newMyPromise = new MyPromise ((resolve, reject) => {
      if (this.status === FULFILLED) { //状态成功，立马调用成功回调
        setTimeout(() => {
          try {
            // successCallback(this.value);
            const result = successCallback(this.value);
            // resolve(result);
            handleThen(newMyPromise, result, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0)
      } else if (this.status === REJECTED) { //状态失败，立马调用失败回调
        setTimeout(() => {
          try {
            // failedCallback(this.error);
            const result = failedCallback(this.error);
            // resolve(result);
            handleThen(result, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0)
      } else {
        // 如果resolve/reject是异步的，那么then里面的回调函数就不会立即执行
        // 需要先存储起来，等resolve/reject调用以后，再依次调用
        this.successCallbackArr.push(() => {
          setTimeout(() => {
            try {
              const result = successCallback(this.value);
              // resolve(result);
              handleThen(result, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0)
        });
        this.failedCallbackArr.push(() => {
          setTimeout(() => {
            try {
              const result = failedCallback(this.error);
              // resolve(result);
              handleThen(result, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0)
        });
      }
    })
    return newMyPromise;
  }

  static resolve (value) {
    if (value instanceof MyPromise) {
      return value;
    } else {
      return new MyPromise(resolve => resolve(value));
    }
  }

  catch (callBack) {
    return this.then(undefined, callBack);
  }

  static all (array) {

    let result = []; // 结果数组
    let indexParam = 0; // 计数，等待array全部调用结束，再一起返回结果

    // all后面可以继续.then，所以该方法返回一个Promise
    return new MyPromise((resolve, reject) => {
      // 结果是以一个数组形式返回，等传入的array全部调用结束
      // 而且是按照传入的顺序，依次返回结果
      function add (key, value) {
        result[key] = value;
        indexParam++;
        if (indexParam === array.length) {
          resolve(result);
        }
      }

      for (let i = 0; i < array.length; i++) {
        if (array[i] instanceof MyPromise) {
          array[i].then(value => add(i, value), error => reject(error));
        } else {
          add(i, array[i]);
        }
      }
    })
  }
  
  finally (callback) {
    return this.then(value => {
      // callback();
      // return value;
      return MyPromise.resolve(callback()).then(() => value);
    }, reason => {
      return MyPromise.resolve(callback()).then(() => { throw reason })
    })
  }

}

function handleThen (newMyPromise, result, resolve, reject) {
  if (result === newMyPromise) {
    return reject('Chaining cycle detected for promise #<Promise>');
  }
  if (result instanceof MyPromise) {
    // result.then(value => resolve(value), error => reject(error));
    result.then(resolve, reject);
  } else {
    resolve(result);
  }
}

module.exports = MyPromise;