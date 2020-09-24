# Vue.js响应式原理
## 数据驱动
- 数据响应式    
    - 数据模型仅仅是普通的JavaScript对象，当修改数据时，视图会进行更新，避免了繁琐的DOM操作，提高开发效率
- 双向绑定
    - 数据改变，视图改变；视图改变，数据也随之改变
    - 可以使用v-model在表单元素上创建双向数据绑定
- 数据驱动：Vue最独特的特性之一
    - 开发过程中仅需要关注数据本身，不需要关心数据是如何渲染到视图

## 数据响应式的核心原理
### Vue 2.x
- 浏览器兼容IE8以上
- 基于Object.defineProperty
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app">
        test
    </div>

    <script>
        // 模拟Vue中data选项
        let data = {
            msg: 'test',
            count: 100
        }

        // 模拟Vue实例
        let vm = {}

        // 数据劫持：当访问或者设置vm中的成员时，做一些干预
        Object.keys(data).forEach(key => {
            Object.defineProperty(vm, key, {
                // 可枚举（可遍历）
                enumerable: true,
                // 可配置（可使用delete删除，可以通过defineProperty重新定义）
                configurable: true,
                // 当获取的时候执行
                get () {
                    return data[key]
                },
                set (newValue) {
                    if (newValue === data[key]) {
                        return
                    }
                    data[key] = newValue
                    document.getElementById('app').innerHTML = data[key]
                }
            })
        })
        
    </script>
</body>
</html>
```

### Vue 3.x
- 基于Proxy
- 直接监听对象，而非属性
- ES6中新增，IE不支持，性能由浏览器优化
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app">
        test
    </div>

    <script>
        // 模拟Vue中data选项
        let data = {
            msg: 'test',
            count: 100
        }

        // 模拟Vue实例
        let vm = new Proxy(data, { // 执行代理行为的函数，当访问vm的成员会执行
            get (target, key) {
                return target[key]
            },
            set (target, key, newValue) {
                if (newValue === target[key]) {
                    return
                }
                target[key] = newValue
                document.getElementById('app').innerHTML = target[key]
            }
        })

    </script>
</body>
</html>
```

## 发布订阅模式和观察者模式
- 发布订阅模式由统一调度中心调用，因此发布者和订阅者不需要知道对方的存在
- 观察者模式是由具有目标调度，比如当时间触发，Dep就会去调用观察者的方法，所以订阅者（观察者）和发布者（目标）之间是存在依赖关系的

### 发布订阅模式
- 订阅者、发布者、信号中心
- 我们假定，存在一个信号中心，某个任务执行完成，就向信号中心发布一个信号，其他任务就可以向信号中心订阅这个信号，从而知道什么时候自己可以开始执行
- 比如：学生考完试，家长天天问考试结果，这时候家长可以去学生班级去订阅考试成绩，留下联系方式，等成绩一出来，老师就通过短信的方式通知各位家长
    - 这个过程中，家长就是订阅者，老师就是发布者，学生班级就是信号中心
```
// 事件触发器
class EventEmitter {
    constructor () {
        this.subs = {} // { 'click': [fn1, fn2], 'change': [fn1] }
    }

    // 注册事件
    $on (eventType, handler) {
        this.subs[eventType] = this.subs[eventType] || []
        this.subs[eventType].push(handler)
    }

    // 触发事件
    $emit (eventType) {
        if (this.subs[eventType]) {
            this.subs[eventType].forEach(handler => {
                handler()
            })
        }
    }
}

let em = new EventEmitter()
em.$on('click', () => {
    console.log('click1')
})
em.$on('click', () => {
    console.log('click2')
})
em.$emit('click')
```

### 观察者模式
- 观察者（订阅者）：Watcher
- 目标（发布者）：Dep
- 没有事件中心
```
// 目标
class Dep {
    constructor () {
        // 记录所有订阅者
        this.subs = []
    }

    // 添加订阅者
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

// 订阅者
class Watcher {
    update () {
        console.log('update')
    }
}

let dep = new Dep()
let watcher = new Watcher()
dep.addSub(watcher)
dep.notify()
```