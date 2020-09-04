// gulp的入口文件
const { series, parallel } = require('gulp')

exports.test = done => {
    // 通过命令 yarn gulp test 执行该任务
    console.log('test task')
    done() // 标识任务完成
}

exports.default = done => {
    // 通过命令 yarn gulp 执行默认任务
    console.log('default task')
    done() 
}

// --------------------创建组合任务---------------------------
const task1 = done => {
    setTimeout(() => {
        console.log('task1')
        done()
    }, 1000)
}

const task2 = done => {
    setTimeout(() => {
        console.log('task2')
        done()
    }, 1000)
}

// 创建串行任务
exports.taskCombine = series(task1, task2) // 依次执行
// 创建并行任务
exports.taskCombine2 = parallel(task1, task2) // 同时执行


// --------------------异步任务---------------------------
// done
exports.callback_error = done => {
    done(new Error('task failed'))
}

exports.promise = () => {
    return Promise.resolve()
}

exports.promise_error = () => {
    return Promise.reject()
}
const timeout = time => {
    return new Promise( resolve => {
        setTimeout(resolve, time)
    })
}
// 这种方式看node版本支不支持async await
exports.async = async () => {
    await timeout(1000)
}

exports.stream = () => {
    // 文件读取流
    const readStream = fs.createReadStream('package.json')
    // 文件写入流
    const writeStream = fs.createWriteStream('temp.txt')
    // 把读取出来的文件流导入写入文件流
    readStream.pipe(writeStream)
    return readStream
}
// stream 中end事件触发结束任务
// exports.stream = done => {
//     const readStream = fs.createReadStream('package.json')
//     const writeStream = fs.createWriteStream('temp.txt')
//     readStream.pipe(writeStream)
//     readStream.on('end', () => {
//         done()
//     })
// }