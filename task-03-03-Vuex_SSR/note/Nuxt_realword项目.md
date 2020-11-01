# Nuxt 案例
## 项目地址
- GitHub仓库：https://github.com/gothinkster/realworld
- 在线实例：https://demo.realworld.io/
- 接口文档：https://github.com/gothinkster/realworld/tree/master/api
- 页面模板：https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INS
TRUCTIONS.md

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