# Vue Router
## Hash模式与History模式的区别
- Hash模式是基于锚点，以及onhashchange事件
    - URL中#后面的内容作为路径地址
    - 监听hashchange事件
    - 根据当前路由地址找到对应组件重新渲染
- History模式是基于HTML5中的HistoryAPI
    - history.pushState() 【IE10以后才支持】
        - 改变地址栏，浏览器并不会向服务器发生请求
        - 监听popstate事件
        - 根据当前路由地址找到对应组件重新渲染
    - history.replaceState()

### History模式的使用
- History模式需要服务器的支持
- 单页应用中，服务端不存在http://www.test.com/login这样的地址会返回找不到该页面
- 在服务端应该除了静态资源外都返回单页应用的index.html
- NodeJS配置
```
const path = require('path')
// 导入处理 history 模式的模块
const history = require('connect-history-api-fallback')
// 导入 express
const express = require('express')

const app = express()
// 注册处理 history 模式的中间件
app.use(history())
// 处理静态资源的中间件，网站根目录 ../web
app.use(express.static(path.join(__dirname, '../web')))

// 开启服务器，端口是 3000
app.listen(3000, () => {
  console.log('服务器开启，端口：3000')
})
```
- Nginx服务器
```
http {
    server {
        location / {
            root html;
            index index.html index.htm;
            try_files $uri/ /index.html
        }
    }
}
```

## 实现原理
- vue-router核心代码
```
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter) // 注册插件

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({ // 创建路由对象
  routes
})

new Vue({ // 创建 Vue 实例，注册 router 对象
    router,
    render: h => h(App)
}).#mount('#app')

```
- 具体实现
```
let _Vue = null

export default class VueRouter {
    static install (Vue) {
        // 判断当前插件是否已经被安装
        if (VueRouter.install.installed) {
            return
        }
        VueRouter.install.installed = true

        // 把Vue构造函数记录到全局变量
        _Vue = Vue;

        // 把创建Vue实例时传入的router对象注入到Vue实例上
        _Vue.mixin({
            beforeCreate () {
                // 如果是Vue实例，就执行该方法；如果是组件，就不需要执行
                if (this.$options.router) {
                    _Vue.prototype.$router = this.$options.router
                    this.$options.router.init()
                }
            },
        })
    }

    constructor (options) {
        this.options = options;
        // 存储路由规则：键值对模式
        this.routerMap = {}
        // 响应式对象：需要存储当前路由地址，当路由发生变化时，需要加载相应组件
        this.data = _Vue.observable({ // observable创建响应式对象
            current: '/' // 记录当前的路由地址，默认'/'
        }) 
    }

    init () {
        this.createRouteMap()
        this.initComponents(_Vue)
        this.initEvent() 
    }

    // 把路由规则转换成键值对的形式进行存储-至routerMap中
    createRouteMap () {
        this.options.routes.forEach (route => {
            this.routerMap[route.path] = route.component
        })
    }

    // 
    initComponents () {
        Vue.component('router-link', {
            props: {
                to: String
            },
            // 这种写法需要引入完整版Vue即带编译器的Vue,将template编译成render
            // 需要在vue.config.js中配置runtimeCompiler: true
            // template: '<a :href="to"><slot></slot></a>' // 运行时版本的vue不支持
            render (h) {
                return h('a', {
                    attrs: {
                        href: this.to
                    },
                    on: {
                        click: this.clickHandler
                    }
                }, [this.$slots.default])
            },
            methods: {
                clickHandler (e) {
                    // pushState三个参数：1.popState接受的事件对象。2.网页标题。3.路径
                    history.pushState({}, '', this.to)
                    this.$router.data.current = this.to
                    e.preventDefault()
                }
            },
        })

        const _this = this
        Vue.component('router-view', {
            render (h) {
                const component = _this.routerMap[_this.data.current]
                return h (component)
            }
        })
    }

    // 注册popstate事件
    initEvent () {
        // 浏览器历史路径变化触发
        window.addEventListener('popstate', () => {
            this.data.current = window.location.pathname
        })
    }
}
```

## Vue的构建版本
- 运行时版本：不支持template模板，需要打包的时候提前编译
- 完整版：包含运行时和编译器，体积比运行时版大10k左右，程序运行的时候把模板转换成render函数