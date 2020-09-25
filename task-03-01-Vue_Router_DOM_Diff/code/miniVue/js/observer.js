class Observer {
    constructor (data) {
        this.walk(data)
    }

    // 遍历data中所有属性
    walk (data) {
        if (!data || typeof data !== 'object') {
            return
        }   
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
        })
    }

    // 把属性转换成getter/setter
    defineReactive (obj, key, value) {
        let _this = this;
        // 负责收集依赖并发送通知
        let dep = new Dep()

        // 如果 val 是对象，继续设置它下面的成员为响应式数据
        this.walk(value)
        
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get () {
                Dep.target && dep.addSub(Dep.target) // 收集依赖
                return value
            },
            set (newValue) {
                if (newValue === obj[key]) {
                    return
                }
                //如果 newValue 是对象，设置 newValue 的成员为响应式
                _this.walk(newValue)
                value = newValue

                // 发送通知
                dep.notify()
            }
        })
    }
}