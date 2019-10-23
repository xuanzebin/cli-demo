// 'use strict'
const _ = require('lodash')
const glob = require('glob')
const path = require('path')
const yosay = require('yosay')
const mkdirp = require('mkdirp')
const Generator = require('yeoman-generator')
const commandExists = require('command-exists').sync

const {
  options,
  prompts,
  dirsToCreate,
  filesToCopy,
  filesToRender
} = require('./config')

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)

    this.answers = {}

    _.forEach(options, (value, key) => {
      this.option(key, value)
    })
  }

  initializing () {
    this.log(yosay("Hello! \n 大家好，欢迎使用测试脚手架"))
  }

  prompting() {
    return this.prompt(prompts).then(answers => {
      this.answers = answers
    })
  }

  writing () {
    const { projectName } = this.answers

    const templateData = {
      ...this.answers
    }

    const copy = (input, output) => {
      this.fs.copy(
        this.templatePath(input),
        this.destinationPath(`${projectName}/${output}`)
      )
    }

    const copyTpl = (input, output, data) => {
      this.fs.copyTpl(
        this.templatePath(input),
        this.destinationPath(`${projectName}/${output}`),
        data
      )
    } // 把data按照模板字符串插入到input的模板中，并输出到output里

    glob.sync(this.templatePath('dot_*')).forEach(file => {
      const output = path.relative(this.templatePath(), file).replace('dot_', '.')
      copy(file, output)
    })

    filesToCopy.forEach(file => {
      copy(file.input, file.output)
    })

    filesToRender.forEach(file => {
      copyTpl(file.input, file.output, templateData)
    })

    dirsToCreate.forEach(file => {
      mkdirp(`${projectName}/${file}`)
    })
  }

  install () {
    const { projectName } = this.answers

    const hasYarn = commandExists('yarn')

    const options = { cwd: path.resolve(projectName), stdio: 'inherit' }

    if (hasYarn) {
      this.yarnInstall(null, options)
    } else {
      this.npmInstall(null, options)
    }
  }
}