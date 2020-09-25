class Dep {
    constructor () {
        this.subs = [] // 存储所有观察者
    }

    // 添加观察者
    addSub (sub) {
        if (sub && sub.update) {
            this.subs.push(sub)
        }
    }

    // 发布通知
    notify () {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}