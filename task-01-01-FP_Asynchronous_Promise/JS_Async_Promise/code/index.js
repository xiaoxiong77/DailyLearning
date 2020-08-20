const MyPromise = require('./promise');

const p = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(1000)
        // reject('failed')
    }, 1000)
    // resolve(10)
    // reject('failed')
})
  
p.then(value => {
    console.log(11,value)
    return 2000;
}).then(value => {
    console.log(33,value)
})