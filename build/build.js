require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')
var webpackTestConfig = require('./webpack.test.conf')



//打包测试环境
function pacelTest (){
    process.env.NODE_ENV = 'test'
    var spinner = ora('开始打包测试环境')
    spinner.start()
    rm(path.join(config.buildTest.assetsRoot, config.buildTest.assetsSubDirectory), err => {
      if (err) throw err
      webpack(webpackTestConfig, function (err, stats) {
        spinner.stop()
        if (err) throw err
        process.stdout.write(stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false
        }) + '\n\n')
        console.log(chalk.cyan('  Build-test complete  测试环境打包成功.\n'))
        
      })
    })
}



var spinner = ora('开始打包正式环境')
    spinner.start()
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
    //开始打包测试环境
    pacelTest();
  })
})



