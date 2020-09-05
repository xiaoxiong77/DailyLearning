## Grunt
- 首先安装 yarn add grunt 工具
- 项目根目录文件下创建gruntfile.js文件【grunt入口文件，用于定义一些需要grunt自动执行的任务】
- 可以通过load-grunt-tasks插件自动加载所有插件任务
- grunt执行任务, 需要导出一个函数，此函数接收一个grunt形参，内部提供一些创建任务时可以用到的API
    - 具体任务构建说明代码页面有相关说明