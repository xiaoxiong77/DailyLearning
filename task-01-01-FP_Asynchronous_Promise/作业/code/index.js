// 第一题
const fn = (value) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(value);
        }, 10)
    })
}

fn('hello')
.then(value => {
    return fn(value + 'lagou');
})
.then(value => {
    setTimeout(() => {
        console.log(value + 'I Love U');
    }, 10)
})


// 第二题
const fp = require('lodash/fp');

const cars = [
    {
        name: '测试1',
        horsepower: 660,
        dollar_value: 7000,
        in_stock: true
    },
    {
        name: '测试2',
        horsepower: 760,
        dollar_value: 9000,
        in_stock: false
    },
    {
        name: '测试3',
        horsepower: 860,
        dollar_value: 8000,
        in_stock: true
    }
];

// 使用函数组合fp.flowRight获取最后一条数据的in_stock值
let isLastInStock = function(cars) {
    let last_car = fp.last(cars);
    return fp.prop('in_stock', last_car);
}

const f = fp.flowRight(fp.prop('in_stock'), fp.last);
console.log(f(cars))

// 使用fp.flowRight()、fp.prop()、fp.first()获取第一条数据的name值
const f2 = fp.flowRight(fp.prop('name'), fp.first);
console.log(f2(cars))

//使用帮助函数_average重构averageDollarValue，使用函数组合的方式实现
let _average = function (xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length;
};
let averageDollarValue = function (cars) {
    let dollar_values = fp.map(function (car) {
        return car.dollar_value
    }, cars);
    return _average(dollar_values);
}
// console.log(averageDollarValue(cars))

const f3 = fp.flowRight(_average, fp.map(car => car.dollar_value));
console.log(f3(cars))

// 使用flowRight写一个函数sanitizeNames，返回一个下划线连接的小写字符串，把数组中的name转换为这种形式，例如sanitizeNames(["Hello World"] => ["hello_world"])
let _underscore = fp.replace(/\W+/g, '_');
const f4 = fp.flowRight(fp.map(_underscore), fp.map(fp.toLower));
console.log(f4(["Hello World"]))


// 第三题
class Container {
    static of (value) {
        return new Container(value)
    }

    constructor (value) {
        this._value = value;
    }

    map (fn) {
        return Container.of(fn(this._value))
    }
}

class Maybe {
    static of (x) {
        return new Maybe(x)
    }

    isNothing () {
        return this._value === null || this._value === undefined
    }

    constructor (x) {
        this._value = x;
    }

    map (fn) {
        return this.isNothing() ? this : Maybe.of(fn(this._value))
    }
}

// 使用fp.add fp.map 创建一个能让functor里的值增加的函数exl
let maybe = Maybe.of([5, 6, 1]);
let exl = () => {
    return maybe.map(x => {
        return fp.map(item => {
            return fp.add(item, 1)
        }, x)
    })
}
console.log(exl()._value)

// 实现一个函数ex2，能够使fp.first获取列表第一个元素
let xs = Container.of(['do', 'ary', 'me']);
let ex2 = () => {
    return xs.map(x => {
        return fp.first(x)
    })
}
console.log(ex2()._value)

// 实现一个函数ex3，使用safeProp和fp.first找到user的名字的首字母
let safeProp = fp.curry(function (x, o) {
    return Maybe.of(o[x]);
});
let user = { id: 2, name: 'Albert' };
let ex3 = () => {
    return safeProp('name', user).map(x => fp.first(x))
}
console.log(ex3()._value)

// 使用Maybe重写ex4，不要有if语句
// let ex4 = function (n) {
//     if (n) {
//         return parseInt(n);
//     }
// }

let ex4 = (n) => {
    return Maybe.of(n).map(x => parseInt(x))
}
console.log(ex4('12.22')._value)
