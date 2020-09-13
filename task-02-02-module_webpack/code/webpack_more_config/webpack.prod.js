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