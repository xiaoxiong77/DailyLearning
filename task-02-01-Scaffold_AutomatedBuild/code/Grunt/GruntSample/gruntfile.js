// 需要导出一个函数，此函数接收一个grunt形参，内部提供一些创建任务时可以用到的API

module.exports = grunt => {
    // 添加配置
    // grunt.initConfig({
    //     foo: 'bar',
    //     obj: {
    //         a: 18
    //     }
    // })

    // grunt.registerTask('task', () => {
    //     // 通过 grunt.config 访问配置文件内容
    //     console.log(grunt.config('foo'))
    //     console.log(grunt.config('obj.a'))
    // })

    // --------------------同步异步任务执行------------------------------------

    // 通过yarn grunt test执行任务
    // grunt.registerTask('test', () => {
    //     console.log('test task')
    //     return false // 标记任务失败
    // })

    // grunt.registerTask('test1', '任务描述', () => {
    //     console.log('test1 task')
    // })

    // // yarn grunt 命令是会默认运行该条任务
    // // grunt.registerTask('default', () => {
    // //     console.log('default task')
    // // })

    // // yarn grunt 命令会默认执行test和test1两个任务
    // // 此时如果test的任务标记失败，后续任务就不在执行，可以使用yarn grunt --force强制其执行
    // grunt.registerTask('default', ['test', 'test1'])

    // // 异步任务
    // grunt.registerTask('async-task', function () {
    //     const done = this.async()
    //     setTimeout(() => {
    //         console.log('async-task')
    //         done()
    //         // done(false) // 标记任务失败
    //     }, 1000)
    // })
    
    // -----------------多目标任务------------------------------

    // // 多目标任务-需要配置不同的目标
    // grunt.initConfig({
    //     build: {
    //         options: { // 作为任务的配置选项，不会出现在this.target中
    //             foo: 'bar'
    //         },
    //         css: 'test001',
    //         js: 'test002'
    //     }
    // })
    // // yarn grunt build 会运行两次，因为有两个目标
    // // yanr grunt build:css 制定目标运行
    // grunt.registerMultiTask('build', function () {
    //     console.log('build task')
    //     // 可以通过this拿到当前执行目标的名称target以及其对应的配置数据data
    //     console.log(`target: ${this.target}, data: ${this.data}`) // --> target: css, data: test001
    //     // this.options拿到配置选项
    //     console.log(this.options()) // --> { foo: 'bar' }
    // })

    // -----------------插件使用------------------------------

    // grunt-contrib-clean 插件 --> 清除文件
    grunt.initConfig({
        clean: {
            temp: 'temp/app.js' // 清除指定目标文件
            // temp: 'temp/*.txt' // 清除指定目录下所有txt文件
            // temp: 'temp/**' // 清除指定目录下所有子目录及其文件
        }
    })
    grunt.loadNpmTasks('grunt-contrib-clean') // 通过命令y arn grunt clean执行

}