const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    // 入口文件
    entry: './src/main.js',
    // 输入文件
    output: {
        filename: 'js/bundle.js', // 文件名
        path: path.join(__dirname, 'dist'), // 文件路径
    },
    // Loader配置
    module: {
        rules: [
            {
                test: /.js$/, // 要处理的文件
                use: {
                    loader: 'babel-loader', 
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                exclude: /node_modules/ // 设置不解析的文件
            },
            {
                test: /.css$/, 
                use: [          
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /.less$/, 
                use: [          // 指定使用的loader，注意loader是从数组的右到左执行的
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /.png$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                        outputPath: 'assets',
                        name: '[name].[ext]'
                    }
                }
            },
            {
                test: /.vue$/,
                use: ['vue-loader']
            },
            {
                test: /.(js | vue)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/ 
            }
        ]
    },
    // Plugin配置
    plugins: [
        new HtmlWebpackPlugin({ // 自动生成html文件
            title: 'vue webpack打包',
            template: './public/index.html'
        }),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            BASE_URL: JSON.stringify('')
        })
    ]
}