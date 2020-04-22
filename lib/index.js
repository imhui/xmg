#!/usr/bin/env node
const path = require('path');
const program = require('commander'); // 引入commander
const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('./build/webpack.config.mini.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const resolve = (file) => path.resolve(process.cwd(), file);


function webpackBuild(option) {

  global.context = resolve(option.src);
  const entry  = option.env === 'peanut' ? 'app' :  option.env;
  const webpackConfig = {
    context: global.context,
    entry: ['./' + entry + '.json'],
    output: {
      path: resolve('dist/' + option.env)
    },
    resolve: {
      alias: {
        components: global.context + '/components',
        utils: global.context + '/utils',
        constants: global.context + '/constants',
        templates: global.context + '/templates',
        styles: global.context + '/styles',
        icons: global.context + '/icons'
      }
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: ('icons/'),
          to: resolve('dist/' + option.env + '/icons')
        }
      ])
    ]
  }
  console.log(webpackConfig)
  config.optimization.minimize = !!Boolean(option.terser);
  const compiler = webpack(merge(config, webpackConfig));
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
  .option('-s, --src [value]', '编译目录', '/src')
  .option('-e, --env [value]', '打包环境env', 'peanut')
  .option('-t, --terser [value]', '压缩JS', true)
  .option('-c, --module [value]', '模块名称', '')
  .action(option => {
    webpackBuild(option);
  })



program.parse(process.argv)