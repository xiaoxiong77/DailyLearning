## 前端工程化
### 主要解决问题
- 传统语言或语法的弊端
- 无法使用模块化/组件化
- 重复的机械式工作
- 代码风格统一、质量保证
- 依赖后端服务接口支持
- 整体依赖后端项目

### 工程化表现
- 一切以提高效率、降低成本、质量保证为目的的手段都属于工程化
- 工程化并不等于某一个工具

## 脚手架工具
### 定义
- 创建项目基础结构、提供项目规范和约定
    - 相同的组织结构
    - 相同的开发范式
    - 相同的模块依赖
    - 相同的工具配置
    - 相同的基础代码

### 常用的脚手架工具
- React --> creat-react-app 
- Vue --> vue-cli
- Angular --> angular-cli
- 通用型项目脚手架 Yeoman
- Plop 项目中创建特定的结构的文件

### Yeoman
- 基础使用
    - 全局安装yo：yarn global add yo
    - 安装对应的generator：比如 yarn global add generator-node
    - 通过yo运行generator：比如yo node
    - 每个generator是一个单独的npm模块
    - 一般generator用于生成项目，sub generator用于补充生成项目中的文件
- 自定义generator
    - 项目里创建一个package.json：yarn init
    - 生成器基类：yarn add yeoman-generator
    - 创建Generator模块，可以写入模板根据模板自动生成
        - 创建文件：generators/app/index.js 
        - 创建模板文件夹：generators/app/templates
    - 全局关联：yarn link
    - 使用自定义的generator：yo 'generator名称'
- 发布generator
    - 将本地代码放到git上
        - 先设置忽略文件 echo node_modules > .gitignore 
        - git init创建本地空仓库
        - git add.
        - git commit -m ''
        - git remote add origin 远端仓库地址
        - git push -u origin master
    - 通过yarn publish --registry=https://registry.yarnpkg.com 或者 npm publish发布
        - 需要设置对应的官方镜像

### Plop
- 主要用于创建项目中特定类型文件的脚手架工具   

## 自动化构建
- 将源代码编译成在线上环境运行的过程

## 常用的自动化构建工具
- Grunt：项目大的时候构建速度慢，基于磁盘读写
- Gulp：基于内存实现，默认同时执行多个任务
- FIS

### Grunt
- yarn add grunt
- 创建gruntfile.js文件【grunt入口文件，用于定义一些需要grunt自动执行的任务】

#### grunt执行任务、标记任务失败、配置选项
```
// 需要导出一个函数，此函数接收一个grunt形参，内部提供一些创建任务时可以用到的API

module.exports = grunt => {
    // 添加配置
    grunt.initConfig({
        foo: 'bar',
        obj: {
            a: 18
        }
    })

    grunt.registerTask('task', () => {
        // 通过 grunt.config 访问配置文件内容
        console.log(grunt.config('foo'))
        console.log(grunt.config('obj.a'))
    })

    // 通过yarn grunt test执行任务
    grunt.registerTask('test', () => {
        console.log('test task')
        return false // 标记任务失败
    })

    grunt.registerTask('test1', '任务描述', () => {
        console.log('test1 task')
    })

    // yarn grunt 命令是会默认运行该条任务
    // grunt.registerTask('default', () => {
    //     console.log('default task')
    // })

    // yarn grunt 命令会默认执行test和test1两个任务
    // 此时如果test的任务标记失败，后续任务就不在执行，可以使用yarn grunt --force强制其执行
    grunt.registerTask('default', ['test', 'test1'])

    // 异步任务
    grunt.registerTask('async-task', function () {
        const done = this.async()
        setTimeout(() => {
            console.log('async-task')
            done()
            // done(false) // 标记任务失败
        }, 1000)
    })
}
```

#### 多目标任务
```
module.exports = grunt => {
    // 多目标任务-需要配置不同的目标
    grunt.initConfig({
        build: {
            options: { // 作为任务的配置选项，不会出现在this.target中
                foo: 'bar'
            },
            css: 'test001',
            js: 'test002'
        }
    })
    // yarn grunt build 会运行两次，因为有两个目标
    // yanr grunt build:css 制定目标运行
    grunt.registerMultiTask('build', function () {
        console.log('build task')
        // 可以通过this拿到当前执行目标的名称target以及其对应的配置数据data
        console.log(`target: ${this.target}, data: ${this.data}`) // --> target: css, data: test001
        // this.options拿到配置选项
        console.log(this.options()) // --> { foo: 'bar' }
    })
}
```

#### grunt插件使用
- yarn add 插件名
- grunt.loadNpmTasks()方法注入插件任务
- yarn grunt 插件名 执行该插件任务
```
module.exports = grunt => {
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
```

#### grunt常用插件
- grunt-sass
- grunt-babel
- grunt-contrib-watch
```
// yarn add grunt-sass sass
// yarn add grunt-bebel @babel/core @babel/preset-env --dev
// yarn add load-grunt-tasks
// yarn add grunt-contrib-watch --dev

const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')

module.exports = grunt => {
  grunt.initConfig({
    sass: {
      options: {
        sourceMap: true,
        implementation: sass
      },
      main: {
        files: {
          'dist/css/main.css': 'src/scss/main.scss'
        }
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env']
      },
      main: {
        files: {
          'dist/js/app.js': 'src/js/app.js'
        }
      }
    },
    watch: {
      js: {
        files: ['src/js/*.js'],
        tasks: ['babel']
      },
      css: {
        files: ['src/scss/*.scss'],
        tasks: ['sass']
      }
    }
  })

  // grunt.loadNpmTasks('grunt-sass')
  loadGruntTasks(grunt) // 自动加载所有的 grunt 插件中的任务

  grunt.registerTask('default', ['sass', 'babel', 'watch'])
}
```

### Gulp
- yarn init 初始化package.json
- yarn add gulp --dev
- 创建gulpfile.js 入口文件

#### 基本使用
```
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
```

#### 组合任务
```
// gulp的入口文件
const { series, parallel } = require('gulp')

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
```

### 异步任务
```
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
```

#### Gulp构建过程核心工作原理
- 读取文件 --> 压缩文件（转换） --> 写入文件