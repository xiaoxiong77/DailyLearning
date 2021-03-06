# Nuxt 案例
## 项目地址
- GitHub仓库：https://github.com/gothinkster/realworld
- 在线实例：https://demo.realworld.io/
- 接口文档：https://github.com/gothinkster/realworld/tree/master/api
- 页面模板：https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INS
TRUCTIONS.md


## 发布部署
### 使用命令打包
- https://zh.nuxtjs.org/guide/commands
- nuxt
    - 启动一个热加载的 Web 服务器（开发模式） localhost:3000
- nuxt build
    - 利用 webpack 编译应用，压缩 JS 和 CSS 资源（发布用）
- nuxt start
    - 以生产模式启动一个 Web 服务器 (需要先执行nuxt build)
- nuxt generate
    - 编译应用，并依据路由配置生成对应的 HTML 文件 (用于静态站点的部署)

### 最简单的部署方式
- 配置Host + Port
```
// nuxt.config.js
server: {
    host: '0.0.0.0',// 监听所有外网地址。在生产环境服务器上外网环境就能访问到了，在本地的话，局域网都能访问到了
    port: 3000
}
```
- 压缩发布包
    - .nuxt文件夹（Nuxt打包生成的资源文件）
    - static文件夹（项目中的静态资源）
    - nuxt.config.js（给Nuxt服务来使用的）
    - package.json （因为在服务端要安装第三方包）
    - yarn.lock（因为在服务端要安装第三方包）
- 将发布包传到服务端
    - 登录服务器：ssh root@118.25.24.162
    - 选择一个目录创建一个 nuxt-realword 文件夹：mkdir nuxt-realword
    - cd nuxt-realword 进入该文件夹， 然后使用 pwd 打印当前文件夹路径
    - 回到本地，使用 scp 命令往服务器传压缩包：scp 本地文件路径 root@118.25.24.162:服务端文件夹路径
- 解压
    - 回到服务器的 nuxt-realword 文件夹里，此时已经有了一个 nuxt-realword.zip 文件，执行unzip nuxt-realword.zip 对压缩包解压
    - 然后使用 ls -a 查看解压后的所有文件
- 安装依赖
    - npm install
- 启动服务
    - npm run start
    - 访问 118.25.24.162:3000

### 使用 pm2 启动服务
- https://pm2.io
- https://github.com/Unitech/pm2
- 生产环境安装：npm install --global pm2
- 启动服务：pm2 start 脚本路径
    - 即：pm2 start npm -- start
    - 访问 118.25.24.162:3000
- pm2 常用命令
    - pm2 list 查看应用列表
    - pm2 start 启动应用
    - pm2 stop 停止应用
    - pm2 reload 重载应用
    - pm2 restart 重启应用
    - pm2 delete 删除应用

### 自动部署
#### 传统的部署方式
- 更新
    - 本地构建
    - 发布
- 更新
    - 本地构建
    - 发布
- …

#### 现代化部署方式（CI/CD）
![](./images/现代化部署方式.jpg)

### 使用GitHub Actions 实现自动部署
- 环境准备
    - Linux服务器
    - 把代码提交到GitHub远程仓库
    - 先在GitHub上建一个仓库，将本地代码提交到仓库里
    ```
    echo "# realworld-nuxtjs" >> README.md
    git init
    echo node_modules > .gitignore
    git add .
    git commit -m "first commit"
    git remote add origin git@github.com:2604150210/realworld-nuxtjs.git
    git push -u origin master
    ```
- 配置GitHub Access Token
    - 生成：https://github.com/settings/tokens
        - 头像 -> Settings -> Developer settings -> Personal access tokens -> Generate new Token Token名称填写Tocken，
        Select scopes勾选repo，然后滚动到网页最下面点击提交按钮。生成了Token
- 配置到项目的Secrets中
    - Settings -> Secrets -> New Secrets
- 配置GitHub Actions执行脚本
    - 在项目根目录创建.github/workflows目录
    - 下载main.yml到workflows目录中：https://github.com/lipengzhou/realworld-nuxtjs/edit/master/.github/workflows/main.yml
    - 修改配置 main.ym
        - 修改对应的服务器路径
        - wget后面的下载地址改为自己的仓库地址
        - 项目的Secrets，配置HOST、USERNAME、PASSWORD、PORT
- 配置PM2配置文件 pm2.config.json
```
{
  "apps": [
    {
      "name": "RealWorld",
      "script": "npm",
      "args": "start"
    }
  ]
}
```
- 提交更新
    - git add .
    - git commit -m"第一次发布部署-测试"
    - git push （此时只是推送了提交记录，并不会触发自动化构建）
    - git add .
    - git tag v0.1.0 （通过tag打版）
    - git tag （查看版本）
    - git push origin v0.1.0 （把本地标签推送到远程仓库，会触发自动构建）

## 项目初始化
- 新建项目文件
- npm init -y 初始化 package.json
- npm install nuxt 安装 nuxt 依赖
- 在 package.json 中添加启动脚本
```
"scripts": { 
    "dev": "nuxt" 
}
```
- 创建 pages/index.vue
```
<template>
    <div>
        <h1>test</h1>
    </div>
</template>

<script>

export default {
  
}

</script>

<style lang="scss">

</style>
```
- npm run dev 启动服务

## 导入样式资源
- 创建 app.html
```
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
<head {{ HEAD_ATTRS }}>
    {{ HEAD }}
    <!-- Import Ionicon icons & Google Fonts our Bootstrap theme relies on -->
    <link href="https://cdn.jsdelivr.net/npm/ionicons@2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css">
    <link
        href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
        rel="stylesheet" type="text/css">
    <!-- Import the custom Bootstrap 4 theme from our hosted CDN -->
    <!-- <link rel="stylesheet" href="//demo.productionready.io/main.css"> -->
    <link rel="stylesheet" href="/index.css">
</head>
<body {{ BODY_ATTRS }}>
    {{ APP }}
</body>
</html>
```

## 布局组件
- 创建 pages/layout/index.vue
![](./images/Nuxt_realword_布局组件.jpg)
- 重新路由表：创建 nuxt.config.js
```
// Nuxt.js 配置文件
export default {
    router: {
        // 自定义路由表规则
        extendRoutes (routes, resolve) {
            // 清除 Nuxt.js 基于 pages 目录默认生成的路由表规则
            routes.splice(0)

            routes.push(
                ...[
                    {
                        path: '/',
                        component: resolve(__dirname, 'pages/layout'),
                        children: [
                            {
                                path: '', // 默认子路由
                                name: 'home',
                                component: resolve(__dirname, 'pages/home')
                            }
                        ]
                    }
                ]
            )
        }
    }
}
```

## 导入登录注册页面以及剩余页面
- 创建 pages/login/index.vue