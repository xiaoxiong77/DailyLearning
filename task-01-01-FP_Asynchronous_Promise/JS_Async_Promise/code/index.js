const MyPromise = require('./promise');

const p = new MyPromise((resolve, reject) => {
    // setTimeout(() => {
    //     resolve(10)
    //     // reject('failed')
    // }, 1000)
    resolve(10)
    // reject('failed')
})

// const p2 = new MyPromise((resolve, reject) => {
//     resolve(1000)
// })
  
// p.then(value => {
//     console.log(11,value)
//     return 1000;
// })
// .catch(error => {
//     console.log(error);
// })

// let p2 = p.then(value => {
//     console.log(value);
//     return p2;
// })
// p2.then(value => {
//     console.log('value', value)
// }, error => {
//     console.log('error', error)
// })

// p.then()
// .then(value => {
//     console.log(value)
// })

// MyPromise.resolve('test')
// .then(value => {
//     console.log('value---', value)
// })

function test () {
    return new Promise((resolve, reject) => {
        resolve('test')
    })
}

// MyPromise.all(['1', '2', test(), '3'])
// .then(result => console.log(result))

test().finally(() => {
    console.log('finally')
})
.then (value => {
    console.log(value)
})

// async function fn1 () {
//     console.log(11)
//     await fn2()
//     console.log(22)
// }

// async function fn2 () {
//     console.log(33)
// }

// console.log(44)

// fn1()

// setTimeout(() => {
//     console.log(55)
// }, 1000)

// console.log(66)

// new Promise((resolve, reject) => {
//     console.log(77)
//     resolve('----')
// })
// .then(value => {
//     console.log(88)
// })