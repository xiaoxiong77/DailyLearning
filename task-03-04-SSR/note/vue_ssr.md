# 搭建自己的服务端渲染（SSR）
## 渲染一个 Vue 实例
- mkdir vue-ssr
- cd vue-ssr
- yarn init -y
- yarn add vue vue-server-renderder
- 创建 server.js
```js
const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer()

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

renderer.renderToString(app, (err,html) => {
    if (err) throw err
    console.log(html)
})
```
- node server.js，运行结果：
    - data-server-rendered="true"这个属性是为了将来客户端渲染激活接管的接口
```js
<div id="app" data-server-rendered="true"><h1>哈哈哈哈</h1></div>
```

## 结合到 Web 服务中
- yarn add express
- server.js：
```js
const Vue = require('vue')
const express = require('express')

const renderer = require('vue-server-renderer').createRenderer()

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
    
    renderer.renderToString(app, (err,html) => {
        if (err) {
            return res.status(500).end('Internet Server Error')
        }
        // 设置编码，防止乱码
        res.setHeader('Content-Type', 'text/html; charset=utf8') 
        // res.end(html)
        res.end(
            `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                ${html}
            </body>
            </html>
            `
        )
    })
})

server.listen(3000, () => {
    console.log('server running at port 3000')
})
```

## 使用 HTML 模板
- 创建模板文件：index.template.html
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <!--vue-ssr-outlet-->
</body>

</html>
```
> `<!--vue-ssr-outlet-->`是占位符，为了接收将来要渲染的变量，不能写错，不能有多余的空格
- server.js 中 createRenderer 方法指定模板文件
```js
const fs = require('fs')

const renderer = require('vue-server-renderer').createRenderer({
    // 指定模板文件
    template: fs.readFileSync('./index.template.html', 'utf-8')
})
```

## 在模板中使用外部数据
- index.template.html
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    {{{ meta }}}
    <title>{{ title }}</title>
</head>

<body>
    <!--vue-ssr-outlet-->
</body>

</html>
```
> 使用两个花括号可以写入外部数据变量，而标签也会进行转义后输出在页面上；此时可以使用三个花括号原样输出数据，不会对标签进行转义处理
- 在 server.js 代码中给 renderer.renderToString 增加第二个参数为外部数据对象
```js
renderer.renderToString(app, {
    title: '拉勾教育',
    meta: `
      <meta name="description" content="拉勾教育" >
    `
  }, (err, html) => {
    if (err) {
      return res.status(500).end('Internal Server Error.')
    }
    // 设置编码，防止乱码
    res.setHeader('Content-Type', 'text/html; charset=utf8') 
    res.end(html)
  })

```