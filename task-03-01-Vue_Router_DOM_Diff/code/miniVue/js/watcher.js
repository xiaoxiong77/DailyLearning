class Watcher {
    constructor (vm, key, cb) {
        this.vm = vm; // vue实例
        this.key = key; // data里的属性名称
        this.cb = cb; // 回调函数，指明如何更新视图

        // 将Watcher对象记录到Dep类的静态属性target
        // 触发get方法，在get方法中会调用addSub
        // 将Dep.target设为空，防止重复添加
        Dep.target = this;

        this.oldValue = vm[key]

        Dep.target = null
    }

    // 当数据发生变化的时候去更新视图
    update () {
        let newValue = this.vm[this.key]
        if (newValue === this.oldValue) {
            return
        }
        this.cb(newValue)
    }
}