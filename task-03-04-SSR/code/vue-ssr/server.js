const Vue = require('vue')
const express = require('express')
const fs = require('fs')

const renderer = require('vue-server-renderer').createRenderer({
    // 指定模板文件
    template: fs.readFileSync('./index.template.html', 'utf-8')
})

const server = express()

server.get('/', (req, res) => {
    const app = new Vue({
        template:  `
            <div id="app">
                <h1>{{ message }}</h1>
            </div>
        `,
        data: {
            message: '哈哈哈哈'
        }
    })
    
    renderer.renderToString(app, {
        title: '测试标题',
        meta: `
            <meta name="description" content="测试001">
        `
    }, (err,html) => {
        if (err) {
            return res.status(500).end('Internet Server Error')
        }
        // 设置编码，防止乱码
        res.setHeader('Content-Type', 'text/html; charset=utf8') 
        res.end(html)
        // res.end(
        //     `
        //     <!DOCTYPE html>
        //     <html lang="en">
        //     <head>
        //         <meta charset="UTF-8">
        //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
        //         <title>Document</title>
        //     </head>
        //     <body>
        //         ${html}
        //     </body>
        //     </html>
        //     `
        // )
    })
})

server.listen(3000, () => {
    console.log('server running at port 3000')
})