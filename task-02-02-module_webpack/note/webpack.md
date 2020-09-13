# webpack
## 快速上手
- yarn add webpack webpack-cli
- yarn webpack 

## 资源模块加载
- webpack只是打包工具，加载器可以用来编译转换代码 
- 默认只会打包js文件，要打包其他文件可引入对应的loader

### css模块加载
- style-loader、css-loader

### 文件资源加载器
- file-loader（导出文件访问路径）
    - 大文件单独提取存放，提高加载速度
- url-loader（打包成Data URLS格式）
    - 小文件使用，减少请求次数

### ES6新特性
- babel-loader、@babel/core、@babel/preset-env

### 常用加载器分类
- 编译转换类，比如css-loader
- 文件操作类，比如file-loader
- 代码检查类：比如eslint-loader

## webpack加载资源方式
- 遵循ES Modules标准的import声明
- 遵循CommonJS标准的require函数
- 遵循AMD标准的define函数和require函数

## Webpack开发一个Loader
- 该loader.js文件内部必须返回一段javascript代码
```
// 转换.md文件的loader

const marked = require('marked')

module.exports = source => {
    const html = marked(source)
    // return `module.exports = ${JSON.stringify(html)}`
    // return `export default ${JSON.stringify(html)}`

    // 或者加入html-loader，将返回结果丢给下一个loader处理
    return html
}
```
- Loader负责资源文件从输入到输出的转换
- 对于同一个资源可以依次使用多个多个Loader

## Webpack插件 
- Loader专注实现资源模块加载
- Plugin解决其他自动化工作
    - 比如清除dist目录/拷贝静态文件到输出目录/压缩输出代码等

### Webpack自动清除输出目录插件
- yarn add clean-webpack-plugin
```
plugins: [
    new CleanWebpackPlugin()
]
```

### Webpack自动生成HTML插件
- yarn add html-webpack-plugin
```
// 配置插件
plugins: [
    new HtmlWebpackPlugin({ // 自动生成HTML文件
        title: 'test webpack html',
        meta: {
            viewport: 'width-device-width'
        },
        template: './src/index.html' // 生成hmtl文件的模板，模板可以字定义，比如title可以从该配置的title读取
    }),
    // 多页面应用，比如还要生成test.html
    new HtmlWebpackPlugin({
        filename: 'test.html'
    })
]
```

### Webpack拷贝插件
- yarn add copy-webpack-plugin
```
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { 
                    from: path.join(__dirname, 'public'), // 需要拷贝的目录
                    to: ''  // 拷贝至哪个目录
                }
            ]
        })
    ]
}
```

## Webpack Dev Sever 
- yarn add webpack-dev-server
- 集成自动编译和自动刷新浏览器等功能
- 打包的文件暂存在内存，这样为了减少磁盘的读写操作，大大增强性能
```
module.exports = {
	devServer: {
        // 指定静态资源目录
        contentBase: ['./public']
        // 配置代理api
        proxy: {
            '/api': {
                target: 'https://api.github.com',
                pathRewrite: {
                    "^/api": ''
                },
                changeOrigin: true
            }
        }
    }
}
```

## Weback 配置 Source Map
- webpack支持sourceMap的12种生成方式, 每种方式的效率和效果各不相同
    - eval: 是否使用eval执行模块代码
    - cheap:  Source Map是否包含行信息
    - module: 是否能够得到loader处理之前的源代码
```
module.exports = {
	devtool: 'source-map'
}
```

## Webpack自动刷新问题
### HMR(hot Module Replacement)
- 模块热更新
- 通过命令行运行 webpack-dev-server --hot
- 或者通过配置文件设置
```
const webpack = require('webpack')

module.exports = {
	devServer: {
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}
```
- 目前样式文件默认可以热更新，js还存在刷新问题，webapck中HMR需要手动处理模块热替换逻辑
    - q1: 样式文件为什么可以自动更新？
        - style-loader中，内置了HMR的功能，样式文件直接替换对应的内容
    - q2: 脚本为什么默认不支持？
        - js模块中导出的内容有不确定的因素

## Webpack不同环境下配置
### 配置文件根据环境不同导出不同配置
- 适用于中小型项目
```
module.exports = {
    const config = {}

    if (env === 'production') {
        config.mode = 'production'
        config.devtool = false
        config.plugins = [
            ...config.plugins,
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin({
                patterns: [
                    { 
                        // 需要拷贝的目录
                        from: path.join(__dirname, 'public'),
                        // 拷贝至哪个目录
                        to: '' 
                    }
                ],
            })
        ]
    }
    return config
}
```

### 一个环境对应一个配置文件
- 适用于大型项目
- 一般建立三个webpack配置文件
    - 一个用于存放公共配置 webpack.common.js
    - 一个用于存放开发环境配置 webpack.dev,js
    - 一个用于存放生产环境配置 webpack.prod.js
- 使用插件去合并配置文件
    - yarn add webpack-merge
- 最后使用命令行 webpack --config webpak.prod.js 通过config参数指定配置文件去运行打包
```
// 比如webpack.prod.js文件中

const path = require('path')
const common = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge (common, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { 
                    // 需要拷贝的目录
                    from: path.join(__dirname, 'public'),
                    // 拷贝至哪个目录
                    to: '' 
                }
            ],
        })
    ]
})
```

##  Webpack DefinePlugin

## Webpack Tree Shaking 以及 合并模块。

- 移除代码中未引用的代码
- 生成环境中打包时会自动开启
- 它并不是webpack的某一配置项，通过以下配置去实现效果
```
module.exports = {
    // 集中配置webpack内部优化功能
    optimization: {
        usedExports: true // 输出结果中只导出外部使用到的模块
        concatenateModules: true, // 尽可能合并每一个模块到一个函数中
        minimize: true // 打包时去掉未引用的代码
    },
}
```

### Tree Shaking 与 Babel
- Tree Shaking 的前提是 ES Modules，即由 Webpack 打包的代码必须使用 ESM
    - 也就是说，正常来说配置中使用了babel-loader以后，Tree Shasking 就会失效
    - 但是最新版本的babel-loader中会自动根据环境去判断是否开启ES Modules -> Common JS的转换，Tree Shaing就可以正常运行
```
module.exports = {
    modules: {
        rules: [
            {
                test: /.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // presets: ['@babel/preset-env']
                        presets: [
                            // modules参数设置是否开启ES Modules -> Common JS的转换
                            ['@babel/preset-env', { modules: false }]
                        ]
                    }
                }
            }
        ]
    }
}
```
