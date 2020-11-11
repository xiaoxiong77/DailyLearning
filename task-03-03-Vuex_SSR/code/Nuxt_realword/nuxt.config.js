// Nuxt.js 配置文件
export default {
    router: {
        linkActiveClass: 'active',
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
                            },
                            {
                                path: '/login', // 登录
                                name: 'login',
                                component: resolve(__dirname, 'pages/login')
                            },
                            {
                                path: '/register', // 注册
                                name: 'register',
                                component: resolve(__dirname, 'pages/login')
                            },
                            {
                                path: '/profile/:username', // 用户个人资料
                                name: 'profile',
                                component: resolve(__dirname, 'pages/profile')
                            },
                            {
                                path: '/settings', // 用户个人资料
                                name: 'settings',
                                component: resolve(__dirname, 'pages/settings')
                            },
                            {
                                path: '/editor', // 用户个人资料
                                name: 'editor',
                                component: resolve(__dirname, 'pages/editor')
                            },
                            {
                                path: '/article/:slug', // 用户个人资料
                                name: 'article',
                                component: resolve(__dirname, 'pages/article')
                            }
                        ]
                    }
                ]
            )
        }
    },
    server: {
        host: '0.0.0.0',
        port: 3000
    },
    plugins: [
        '~/plugins/request.js',
        '~/plugins/dayjs.js'
    ]
}