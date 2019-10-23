#! usr/bin/env node

const _ = require('lodash')
const path = require('path')
const yeoman = require('yeoman-environment')
const inquirer = require('inquirer')

const env = yeoman.createEnv()

const resolve = relativePath => path.join(__dirname, relativePath)

env.register(resolve('./yeoman/test1/index.js'), 'app:project-test1')
env.register(resolve('./yeoman/test2/index.js'), 'app:project-test2')

async function askQuestions () {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: '请选择你要创建的模板',
      choices: ['test1', 'test2']
    }
  ])
}

module.exports = async (argv) => {
  const type = (await askQuestions()).type

  env.run(`app:project-${type}`)
}