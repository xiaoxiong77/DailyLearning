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