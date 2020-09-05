// 实现这个项目的构建任务

const { src, dest, parallel, series, watch } = require('gulp')

const del = require('del')
const browsSync = require('browser-sync')

const loadPlugins = require('gulp-load-plugins') // 自动加载插件
const plugins = loadPlugins() // 下面使用的时候，就直接引用plugins.XXX使用
// const sass = require('gulp-sass')
// const babel = require('gulp-babel') 
// const swig = require('gulp-swig')
// const imagemin = require('gulp-imagemin')

const bs = browsSync.create() // 创建一个开发服务器

// 启动开发服务器
const serve = () => {
    // 通过 watch 监听src下面相应文件变化，然后出发对应的构建任务，使得页面自动刷新 
    watch('src/assets/styles/*.scss', style)
    watch('src/assets/scripts/*.js', script)
    watch('src/*.html', page)
    // watch('src/assets/images/**', image)
    // watch('src/assets/fonts/**', font)
    // watch('public/**', extra)
    watch([
        'src/assets/images/**',
        'src/assets/fonts/**',
        'public/**'
    ], bs.reload) // 自动更新，但不执行构建任务

    bs.init({
        notify: false,
        port: 3001, // 端口
        // open: false, // 是否自动打开浏览器
        files: 'dist/**', // 监听dist目录文件修改，然后自动更新页面内容
        server: {
            // baseDir: 'dist', // 基于哪个文件去运行
            baseDir: ['temp', 'src', 'public'],
            routes: {
                '/node_modules': 'node_modules'
            }
        }
    })
}

// 清除 dist 文件夹
const clean = () => {
    return del(['dist', 'temp'])
}

/**
 * 构建样式文件
 * - yarn add gulp-sass
 * - 通过 yarn gulp style 执行该任务
 */
const style = () => {
    // base定义基础文件路径，最后构建完成会生成在dist目录下面-对应src下面的目录文件
    return src('src/assets/styles/*.scss', { base: 'src' }) // 读取文件流
        .pipe(plugins.sass({ outputStyle: 'expanded' })) // 转换文件流
        .pipe(dest('temp')) // 写入文件流
}

/**
 * 构建script中js文件
 * - yarn add gulp-babel @babel/core @babel/preset-env --dev
 * - 通过 yarn gulp script 执行该任务
 */
const script = () => {
    return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(plugins.babel({ presets: ['@babel/preset-env'] })) 
    .pipe(dest('temp'))
}

/**
 * 构建src下面的html文件
 * - yarn add gulp-swig --dev
 * - 通过 yarn gulp page 执行该任务
 */
const page = () => {
    // return src('src/**/*.html') // 表示src以及子目录文件夹下面所有的html文件
    return src('src/*.html', { base: 'src' })
        // 配置cache参数-->防止可能会因为swig模板引擎缓存机制导致页面不刷新的问题出现
        .pipe(plugins.swig({ defaults: { cache: false }})) 
        .pipe(dest('temp'))
}

/**
 * 构建图片文件
 * - yarn add gulp-imagemin --dev
 * - 通过 yarn gulp page 执行该任务
 */
const image = () => {
    return src('src/assets/images/**', { base: 'src' })
        .pipe(plugins.imagemin())
        .pipe(dest('dist'))
}

// 构建字体文件
const font = () => {
    return src('src/assets/fonts/**', { base: 'src' })
        .pipe(plugins.imagemin())
        .pipe(dest('dist'))
}

const extra = () => {
    return src('public/**', { base: 'public' })
        .pipe(dest('dist'))
}

// 针对dist文件里的html文件-内部依赖了外部文件（有构建注释），通过gulp-useref插件对文件引用做处理
const useref = () => {
    return src('temp/*.html', { base: 'temp' })
        .pipe(plugins.useref({ searchPath: ['temp', '.'] }))
        // html js css 压缩文件
        .pipe(plugins.if(/\.js$/, plugins.uglify()))
        .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
        .pipe(plugins.if(/\.html$/, plugins.htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true
        })))
        .pipe(dest('dist'))
}

// 并行任务 yarn gulp compile
const compile = parallel(style, script, page);

// 串行任务，先清除dist目录再进行构建-上线之前执行的任务
const build = series(clean, parallel(series(compile, useref), image, font, extra));

const develop = series(compile, serve);

module.exports = {
    // style,
    // script,
    // page,
    // image,
    // font,
    clean,
    // compile,
    build,
    develop,
    // useref
}