#!/usr/bin/env node
const program = require('commander'); // 引入commander
const webpack = require('webpack');
const config = require('./build/webpack.config.mini.js');

function webpackBuild () {

    console.log(config, 'config')
    const compiler = webpack(config);
    // compiler.run((err, stats) => {
    //     if (err) {
    //         return reject(err);
    //     }
    // });
    const watching = compiler.watch({
        // watchOptions 示例
        aggregateTimeout: 300,
        poll: undefined
      }, (err, stats) => {
        // 在这里打印 watch/build 结果...
        // console.log(stats);
        if (err) {
          console.log(err)
        }
        console.log(stats)
      });
}

program
    .command('build')
    .alias('b')
    .description('创建新的模块')
    .option('-m, --module [value]', '模块名称', '')
    .action(option => {
        // console.log(option, 'option')
        // console.log(require.resolve('./src/index.js'), 'dsssd')
        webpackBuild();
    })


    
program.parse(process.argv)