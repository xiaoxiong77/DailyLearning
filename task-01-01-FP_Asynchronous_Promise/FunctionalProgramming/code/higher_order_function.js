//forEach
const forEach = (array, fn) => {
    for (let i = 0; i< array.length; i++) {
        fn(array[i])
    }
}

//map
const map = (array, fn) => {
    let newArray = [];
    for (value of array) {
        newArray.push(fn(value))
    }
    return newArray;
}

const testArr = [1, 2, 3];
// forEach(testArr, (value) => console.log(value))
const result = map(testArr, (value) => value += 1);
console.log(result)