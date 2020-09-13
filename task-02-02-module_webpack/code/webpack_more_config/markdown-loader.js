const marked = require('marked')

module.exports = source => {
    const html = marked(source)
    // return `module.exports = ${JSON.stringify(html)}`
    // return `export default ${JSON.stringify(html)}`

    // 加入html-loader，将返回结果丢给下一个loader处理
    return html
}