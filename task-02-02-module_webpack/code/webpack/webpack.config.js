const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    // 打包模式 development/production/none 
    mode: 'none', 
    // 入口文件
    entry: './src/index.js', // 可相对路径可绝对路径
    // 输出文件
    output: { 
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'), // 必须是绝对路径
        // publicPath: 'dist/'
    },
    // 集中配置webpack内部优化功能
    optimization: {
        usedExports: true // 输出结果中只导出外部使用到的模块
        concatenateModules: true, // 尽可能合并每一个模块到一个函数中
        minimize: true // 打包时去掉未引用的代码
    },
    // 配置sourceMap
    devtool: 'source-map', 
    devServer: {
        hot: true, // 配置HMR热更新
        contentBase: ['./public'], // 指定静态资源目录
        proxy: { // 配置配置代理api
            '/api': {
                target: 'https://api.github.com',
                pathRewrite: {
                    "^/api": ''
                },
                changeOrigin: true
            }
        }
    },
    module: {
        rules: [
            {
                test: /.js$/, // 编译es6新特性语法
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
            },
            {
                test: /.css$/, // 给css文件配置loader后续进行打包
                use: [
                    'style-loader', // 把CSS文件注入到JavaScript中，通过DOM操作去加载CSS
                    'css-loader' // 加载CSS，支持模块化、压缩、文件导入等特性
                ]
            },
            {
                test: /.png$/, // 文件加载器，打包图片/字体等
                // use: 'file-loader'
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10 * 1024 // 10KB，超过了就采用file-loader打包
                    }
                }
            },
            // 自定义.md文件的loader
            {
                test: /.md$/,
                // use: './markdown-loader'
                use: [
                    'html-loader',
                    './markdown-loader'
                ]
            }
        ]
    },
    // 配置插件
    plugins: [
        new CleanWebpackPlugin(), // 自动清除输出目录文件 
        // 用于生成index.html文件
        new HtmlWebpackPlugin({ // 自动生成HTML文件
            title: 'test webpack html',
            meta: {
                viewport: 'width-device-width'
            },
            template: './src/index.html' // 生成hmtl文件的模板，模板可以字定义，比如title可以从该配置的title读取
        }),
        // 多页面应用，比如还要生成test.html
        // new HtmlWebpackPlugin({
        //     filename: 'test.html'
        // }),
        new webpack.HotModuleReplacementPlugin() // 配置HMR热更新
    ]
}

// module.exports = (env, argv) => {
//     const config = {
//         mode: 'development',
//         entry: './src/index.js', // 入口文件
//         output: {
//             filename: 'js/bundle.js'
//         },
//         devtool: 'cheap-eval-module-source-map',
//         devServer: {
//             hot: true,
//             contentBase: 'public'
//         },
//         module: {
//             rules: [
//                 {
//                     test: /.js$/, // 编译es6新特性语法
//                     exclude: ["/node_modules"],
//                     use: {
//                         loader: 'babel-loader',
//                         options: {
//                             presets: ['@babel/preset-env']
//                         }
//                     }
//                 },
//                 {
//                     test: /.css$/, // 给css文件配置loader后续进行打包
//                     use: [
//                         'style-loader',
//                         'css-loader'
//                     ]
//                 },
//                 {
//                     test: /.png$/, // 文件加载器，打包图片/字体等
//                     // use: 'file-loader'
//                     use: {
//                         loader: 'url-loader',
//                         options: {
//                             limit: 10 * 1024 // 10KB，超过了就采用file-loader打包
//                         }
//                     }
//                 },
//                 // 自定义.md文件的loader
//                 {
//                     test: /.md$/,
//                     // use: './markdown-loader'
//                     use: [
//                         'html-loader',
//                         './markdown-loader'
//                     ]
//                 }
//             ]
//         },
//         // 配置插件
//         plugins: [
//             // 用于生成index.html文件
//             new HtmlWebpackPlugin({ // 自动生成HTML文件
//                 title: 'test webpack html',
//                 meta: {
//                     viewport: 'width-device-width'
//                 },
//                 template: './src/index.html' // 生成hmtl文件的模板，模板可以字定义，比如title可以从该配置的title读取
//             }),
//             new webpack.HotModuleReplacementPlugin() // 配置HMR热更新
//         ]
//     }

//     // 为不同的环境导出不同的配置
//     if (env === 'production') {
//         config.mode = 'production'
//         config.devtool = false
//         config.plugins = [
//           ...config.plugins,
//           new CleanWebpackPlugin(),
//           new CopyWebpackPlugin({
//             patterns: [
//                 { 
//                     // 需要拷贝的目录
//                     from: path.join(__dirname, 'public'),
//                     // 拷贝至哪个目录
//                     to: '' 
//                 }
//             ],
//           })
//         ]
//     }

//     return config
// }