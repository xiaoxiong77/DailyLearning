## 模块化
### 模块化演变（第一阶段）
- 基于文件的划分模块的方式
    - 具体做法就是将每个功能及其相关状态数据各自单独放到不同的文件中，约定每个文件就是一个独立的模块，
    使用某个模块就是通过script标签将这个模块引入到页面中，然后直接调用模块中的成员（变量 / 函数）
- 缺点
    - 所有模块都直接在全局工作，没有私有空间，所有成员都可以在模块外部被访问或者修改
    - 模块一旦多了过后，容易产生命名冲突
    - 无法管理模块与模块之间的依赖关系
```
// module a 相关状态数据和功能函数
var name = 'module-a'

function method1 () {
    console.log(name + '#method1')
}

function method2 () {
    console.log(name + '#method2')
}

// module b 相关状态数据和功能函数
var name = 'module-b'

function method1 () {
    console.log(name + '#method1')
}

function method2 () {
    console.log(name + '#method2')
}

<script>
    // 命名冲突
    method1()
    // 模块成员可以被修改
    name = 'foo'
</script>
```

### 模块化演变（第二阶段）
- 每个模块只暴露一个全局对象，所有模块成员都挂载到这个对象中
    - 具体做法就是在第一阶段的基础上，通过将每个模块「包裹」为一个全局对象的形式实现，有点类似于为模块内的成员添加了「命名空间」的感觉
- 缺点
    - 通过「命名空间」减小了命名冲突的可能，但是同样没有私有空间，所有模块成员也可以在模块外部被访问或者修改
    - 无法管理模块之间的依赖关系
```
// module a 相关状态数据和功能函数
var moduleA = {
    name: 'module-a',

    method1: function () {
        console.log(this.name + '#method1')
    },

    method2: function () {
        console.log(this.name + '#method2')
    }
}

// module b 相关状态数据和功能函数
var moduleB = {
    name: 'module-b',

    method1: function () {
        console.log(this.name + '#method1')
    },

    method2: function () {
        console.log(this.name + '#method2')
    }
}
<script src="module-a.js"></script>
<script src="module-b.js"></script>
<script>
    moduleA.method1()
    moduleB.method1()
    // 模块成员可以被修改
    moduleA.name = 'foo'
</script>
```

### 模块化演变（第三阶段）
- 使用立即执行函数表达式（IIFE：Immediately-Invoked Function Expression）为模块提供私有空间
    - 具体做法就是将每个模块成员都放在一个函数提供的私有作用域中，对于需要暴露给外部的成员，通过挂在到全局对象上的方式实现
- 有了私有成员的概念，私有成员只能在模块成员内通过闭包的形式访问
```
// module a 相关状态数据和功能函数
(function () {
    var name = 'module-a'
    
    function method1 () {
        console.log(name + '#method1')
    }
    
    function method2 () {
        console.log(name + '#method2')
    }

    window.moduleA = {
        method1: method1,
        method2: method2
    }
})()

// module b 相关状态数据和功能函数
(function () {
    var name = 'module-b'
    
    function method1 () {
        console.log(name + '#method1')
    }
    
    function method2 () {
        console.log(name + '#method2')
    }

    window.moduleB = {
        method1: method1,
        method2: method2
    }
})()

<script src="module-a.js"></script>
<script src="module-b.js"></script>
<script>
    moduleA.method1()
    moduleB.method1()
    // 模块私有成员无法访问
    console.log(moduleA.name) // => undefined
</script>
```

### 模块化演变（第四阶段）
- 利用 IIFE 参数作为依赖声明使用
    - 具体做法就是在第三阶段的基础上，利用立即执行函数的参数传递模块依赖项, 使得每一个模块之间的关系变得更加明显
```
// module a 相关状态数据和功能函数
(function ($) {
    var name = 'module-a'
    
    function method1 () {
        console.log(name + '#method1')
        $('body').animate({ margin: '200px' })
    }
    
    function method2 () {
        console.log(name + '#method2')
    }

    window.moduleA = {
        method1: method1,
        method2: method2
    }
})(jQuery)

// module b 相关状态数据和功能函数
(function () {
    var name = 'module-b'
    
    function method1 () {
        console.log(name + '#method1')
    }
    
    function method2 () {
        console.log(name + '#method2')
    }

    window.moduleB = {
        method1: method1,
        method2: method2
    }
})()

<script src="https://unpkg.com/jquery"></script>
<script src="module-a.js"></script>
<script src="module-b.js"></script>
<script>
    moduleA.method1()
    moduleB.method1()
</script>
```

### 模块化规范的出现
#### Common JS
- 一个文件就是一个模块
- 每个模块都有单独的作用域
- 通过module.exports导出成员
- 通过require函数载入模块

#### Require.js 
- 提供了 AMD 模块化规范，以及一个自动化模块加载器

### ES Modules
- 自动采用严格模式
- 每个ESM都是单独的私有作用域
- ESM通过COR去请求外部JS模块
- ESM的script标签会延迟执行脚本（等同于script标签中defer属性）