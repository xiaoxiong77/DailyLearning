// 第一题
var a = [];
for (var i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i)
    }
}
a[6]()

// 第二题
// var tmp = 123;
// if (true) {
//     console.log(tmp)
//     let tmp
// }

// 第三题
const arr = [12, 34, 32, 89, 4]
console.log(Math.min(...arr))

// 第五题
var b = 10
var obj = {
    b: 20,
    fn () {
        setTimeout(() => {
            console.log(this.b)
        })
    }
}
obj.fn()