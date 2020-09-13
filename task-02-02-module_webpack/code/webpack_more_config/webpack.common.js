const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: './src/index.js', // 入口文件
    output: {
        filename: 'js/bundle.js'
    },
    devServer: {
        hot: true,
        contentBase: 'public'
    },
    module: {
        rules: [
            {
                test: /.js$/, // 编译es6新特性语法
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /.css$/, // 给css文件配置loader后续进行打包
                use: [
                    'style-loader',
                    'css-loader'
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
        // 用于生成index.html文件
        new HtmlWebpackPlugin({ // 自动生成HTML文件
            title: 'test webpack html',
            meta: {
                viewport: 'width-device-width'
            },
            template: './src/index.html' // 生成hmtl文件的模板，模板可以字定义，比如title可以从该配置的title读取
        }),
        new webpack.HotModuleReplacementPlugin() // 配置HMR热更新
    ]
}