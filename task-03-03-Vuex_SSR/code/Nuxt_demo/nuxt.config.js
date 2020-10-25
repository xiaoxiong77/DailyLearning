// Nuxt.js 配置文件
module.exports = {
    router: {
        base: '/',
        // routes就是路由配置表，是个数组
        // resolve是解析路由路径的
        extendRoutes(routes, resolve) {
            routes.push({
              name: 'hello',
              path: '/hello',
              component: resolve(__dirname, 'pages/about.vue')
            })
        }
    }
}