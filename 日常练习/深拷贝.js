// // 判断数据类型
// const getType = (target) => {
//     return Object.prototype.toString.call(target)
// }


// /**
//  * 防止循环引用（对象的属性间接或直接的引用了自身）
//  * let data = { a: 1 }
//  * data.b = data
//  * 解决：当需要拷贝当前对象时，先去 map 中找，有没有拷贝过这个对象，如果有的话直接返回，如果没有的话继续拷贝
//  * 最后需要把变量 map 置为 null ，释放内存，防止内存泄露
//  */
// let cache = new Map()

// const clone = (target) => {
//     if (cache.get(target)) {
//         return cache.get(target)
//     }
//     // 判断是否为引用类型
//     if (target !== null && typeof target === 'object') {

//         // 具体再进行数据类型的判断（比如数组类型、日期类型、正则类型）
//         let result
//         if (getType(target) === '[object Array]') {
//             result = []
//         } else if (getType(target) === '[object Date]') {
//             result = new Date(target)
//         } else if (getType(target) === '[object RegExp]') {
//             result = new RegExp(target.source, target.flags)
//         } else {
//             result = {}
//         }

        
//         cache.set(target, result)

//         for (let key in target) {
//             // for...in 循环遍历对象的属性时，其原型链上的所有属性都将被访问
//             // 如果只要只遍历对象自身的属性，而不遍历继承于原型链上的属性，要使用 hasOwnProperty 方法过滤一下
//             if (target.hasOwnProperty(key)) {
//                 result[key] = clone(target[key])
//             }
//         }
//         return result
//     } else { // 如果不是引用类型，直接返回
//         return target
//     }
// }

// // const obj = {
// //     a: 'test',
// //     b: {
// //         z: '001',
// //         x: '002'
// //     },
// //     c: 100,
// //     d: [1, 2, 3],
// //     e: new Date(),
// //     f: /\d/
// // }
// // let newObj = clone(obj)
// // newObj.d[0] = 9
// // console.log('clone-obj', obj)
// // console.log('clone-newObj', newObj)

// const obj2 = {
//     a: 1
// }
// obj2.b = obj2
// let newObj = clone(obj2)
// console.log('clone-newObj', newObj)


function deepClone (obj, hash = new Map()) {
    // 如果是 null/undefined 不需要深拷贝，直接返回
    if (obj === null || obj === undefined || typeof obj !== 'object') return obj
    // 日期和正则格式
    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof RegExp) return new RegExp(obj)
    // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
    if (typeof obj !== 'object') return obj

    // 判断是否已经拷贝过
    if (hash.get(obj)) return hash.get(obj)

    let cloneObj = Array.isArray(obj) ? [] : {} // 判断是对象还是数组

    hash.set(obj, cloneObj) // 存储拷贝之后的对象

    for (let key in obj) {
        // for...in 循环遍历对象的属性时，其原型链上的所有属性都将被访问
        // 如果只要只遍历对象自身的属性，而不遍历继承于原型链上的属性，要使用 hasOwnProperty 方法过滤一下
        if (obj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(obj[key], hash)
        }
    }
    return cloneObj
}
const a = {
    age: 1,
    date: new Date(),
    reg: /\d/,
    arr: [1,2,3],
    children: {
        name: '哈哈'
    }
}
a.x = a // 对象存在循环引用
let b = deepClone(a)
b.children.name = '嘻嘻'
b.arr[0] = 7
console.log(a)
console.log(b)