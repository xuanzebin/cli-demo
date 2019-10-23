module.exports = {
  options: {},
  prompts: [{
    type: 'input',
    name: 'projectName',
    message: '项目名称',
    default: 'project1'
  },{
    type: 'input',
    name: 'testDescription',
    message: '说说你对这个测试脚手架的想法咯',
    default: '真的很垃圾'
  }],
  dirsToCreate: ['test'],
  filesToCopy: [
    {
      input: '!(dot_|_package.json)*/**',
      output: ''
    }
  ],
  filesToRender: [
    {
      input: '_package.json',
      ouput: 'package.json'
    }
  ]
}