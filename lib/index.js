#!/usr/bin/env node
const program = require('commander'); // 引入commander
const webpack = require('webpack');
const config = require('./build/webpack.config.mini.js');

function webpackBuild (option) {
  config.optimization.minimize = !Boolean(option.terser);
    const compiler = webpack(config);
    const watching = compiler.watch({
        // watchOptions 示例
        aggregateTimeout: 300,
        poll: undefined
      }, (err, stats) => {
        // 在这里打印 watch/build 结果...
        if (err) {
          console.log(err)
        }
        console.log(stats)
      });
}

program
    .command('build')
    .alias('dbb')
    .description('开始编译')
    .option('-s, --src [value]', '编译目录', '')
    .option('-c, --module [value]', '模块名称', '')
    .option('-e, --env [value]', 'env打包环境', 'development')
    .option('-t, --terser [value]', 'js不压缩', false)
    .action(option => {
        webpackBuild(option);
    })


    
program.parse(process.argv)