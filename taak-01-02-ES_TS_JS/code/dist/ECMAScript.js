const obj = { name: 'test'};
// const { name } = obj;
const { name: newName } = obj;
console.log(newName); // => test
const { age = 20 } = obj;
console.log(age) // => 20（相当于设置默认初始值）

let num = 5;
const str = `hello ${1 + 2} ${num}`;
console.log(str);

const fn = (m, n = 1) => {
    console.log(m, n);
};
fn(2);

const obj2 = {
    name: 'test',
    say: function () {
        console.log(this); // => obj2
    },
    say2: () => {
        console.log(this); // => window
    },
    sayAsync: () => {
        setTimeout(() => {
            console.log(this) // => window
        }, 1000)
    },
    sayAsync2: function () {
        setTimeout(() => {
            console.log(this) // => obj2
        }, 1000)
    },
    sayAsync3: function () {
        setTimeout(function () {
            console.log(this) // => window
        }, 1000)
    }
};

obj2.say();
obj2.say2();
obj2.sayAsync();
obj2.sayAsync2();
obj2.sayAsync3(); 

const obj3 = {
    sayAsync: function () {
        setTimeout(() => {
            console.log(this) // => window
        }, 1000)
    }
}
const test = obj3.sayAsync;
test();

// var o = {
//     name: 'ggg',
//     hello: function() {
//         console.log(this)
//         var a = function () {
//             setTimeout(() => {
//                 console.log(11111, this.name) 
//             }, 1000)
//         }
//         a();
//     }
// }


const obj = {
    name: 'aaa',
    age: 18
};

const objProperty = new Proxy(obj, {
    get (target, property) {
        return target[property] ? target[property] : 'undefined';
    },
    set (target, property, value) {
        target[property] = value;
    },
    deleteProperty (target, property) {
        delete target[property];
    }  
})

console.log(objProperty.name) // 读
objProperty.age = 20; // 写
delete objProperty.name; // 删除
