## Webpack
- 根据项目的目录文件结构，有三个webpack相关配置文件，各位公共配置、开发环境配置、生产环境配置
- 安装webpack：yarn add webpack webpack-cli --dev

### webpack.common.js文件配置
- 开发环境和生产环境公用的配置文件
- 指定入口文件entry：后期打包的时候webpack会根据入口文件递归寻找其所依赖的所有模块依次进行编译打包处理
- 指定输出文件output：打包完成后会根据这里配置的文件名filename以及输出路径path，输入打包后的文件
- Loade配置：对指定文件进行编译处理
    - 将ES6语法转换为ES5：yarn add babel-loader @babel/core @babel/preset-env --dev
    - 将less转换为css: yarn add less-loader css-loader style-loader --dev
    - 打包图片或字体：yarn add url-loader file-loader --dev
    - 处理.vue文件：yarn add vue-loader vue-template-compiler --dev
    - 配置eslint-loader：yarn add eslint eslint-loader --dev
- Plugin配置：例如每次打包之前清除之前的打包文件、自动生成html文件
    - 清除上一次的打包文件：yarn add clean-webpack-plugin --dev
    - 自动生成html文件：yarn add html-webpack-plugin --dev
    - 拷贝public下面的图片：yarn add copy-webpack-plugin --dev

### webpack.dev.js文件配置
- 加入打包模式mode配置为development
- 为了方便调试，需要添加source map，以便发生错误是可以快速定位错误代码
- yarn add webpack-dev-server实时运行在浏览器
- yarn add webpack-merge合并webpack.common.js文件的配置

### webpack.prod.js文件配置
- 加入打包模式mode配置为production