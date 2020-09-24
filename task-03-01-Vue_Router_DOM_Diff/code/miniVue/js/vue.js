class Vue {
    constructor (options) {
        // 1）通过属性保存选项的数据
        this.$options = options || {}
        this.$data = options.data || {}
        this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el

        // 2）把data中的成员转换成getter/setter，注入到Vue实例中
        this._proxyData(this.$data)

        // 3）调用observer对象，监听数据变化
        new Observer(this.$data)

        // 4）调用compile对象，解析指令和差值表达式
        new Compiler(this)
    }

    _proxyData (data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get () {
                    return data[key]
                },
                set (newValue) {
                    if (newValue === data[key]) {
                        return
                    }
                    data[key] = newValue
                }
            })
        })
    }
}