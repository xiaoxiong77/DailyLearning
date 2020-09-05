// 实现这个项目的构建任务

const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks') // 自动加载所有的 grunt 插件中的任务

module.exports = grunt => {
    grunt.initConfig({
        // yarn add grunt-sass sass --dev
        sass: { // 构建样式文件 
            options: {
                implementation: sass
            },
            main: {
                files: {
                    // 目标文件 --> 源文件
                    'dist/assets/styles/main.css': 'src/assets/styles/main.scss'
                }
            }
        },
        // yarn add grunt-bebel @babel/core @babel/preset-env --dev
        babel: {
            options: {
                presets: ['@babel/preset-env'] // 根据最新的es特性去进行转换
            },
            main: {
                files: {
                    'dist/assets/scripts/main.js': 'src/assets/scripts/main.js'
                }
            }
        },
        // 实时监视文件变化改变去执行构建任务
        // yarn add grunt-contrib-watch --dev
        watch: {
            js: {
                files: ['src/scripts/*.js'],
                tasks: ['babel']
            },
            css: {
                files: ['src/assets/styles/*.scss'],
                tasks: ['sass']
            }
        }
    })
    
    loadGruntTasks(grunt) 
    // 注册任务，保证启动的时候默认先执行依次sass/babel编译任务，在实时监视
    grunt.registerTask('default', ['sass', 'babel', 'watch'])
}