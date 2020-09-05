#!/usr/bin/env node

const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

// 模板目录
const templateDir = path.join(__dirname, 'templates')
// 目标目录
const destDir = process.cwd()

// 发起用户提问
inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'projectName'
    }
])
.then(answer => { // 获取用户通过命令行输入的问题回答信息

    // 通过fs模块读取模板下面的所有文件
    fs.readdir(templateDir, ( err, files ) => {
        if (err) {
            throw err
        }
        files.forEach(file => {
            // 通过模板引擎渲染文件
            ejs.renderFile(path.join(templateDir, file), answer, ( err, result ) => {
                if (err) {
                    throw err
                }
                // 写入到目标文件
                fs.writeFileSync(path.join(destDir, file), result)
            })
        })
    })
})