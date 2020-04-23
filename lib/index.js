#!/usr/bin/env node
const path = require('path');
const program = require('commander'); // 引入commander
const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('./build/webpack.config.mini.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniProgramPlugin = require('./src/index.js').plugin;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const resolve = (file) => path.resolve(process.cwd(), file);

const fileLoader = (name, context = global.context) => ({
  loader: require.resolve('file-loader'),
  options: {
    publicPath: '',
    context,
    name
  }
});

const xmgLoader = require.resolve('./src/index.js')

function webpackBuild(option) {

  global.context = resolve(option.src);
  const entry = option.env === 'peanut' ? 'app' : option.env;

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
      new MiniProgramPlugin(),
      new CopyWebpackPlugin([
        {
          from: ('icons/'),
          to: resolve('dist/' + option.env + '/icons')
        }
      ]),
      new CleanWebpackPlugin(
        {
          cleanOnceBeforeBuildPatterns: [resolve('./dist/' + option.env)],
          cleanAfterEveryBuildPatterns: ['!icons/**/*'],
          verbose: true,
          dry: true,
          cleanStaleWebpackAssets: false
        }
      ),
      new webpack.DefinePlugin({
        ENV: JSON.stringify(process.env.NODE_ENV === option.env)
      })
    ],
    module: {
      rules: [
        {
          test: /.wxml/,
          use: [
            fileLoader('[path][name].[ext]'),
            xmgLoader,
          ]
        },
        {
          test: /\.wxss$/,
          use: [
            fileLoader('[path][name].[ext]'),
            xmgLoader,
          ]
        },
        {
          test: /\.scss$/,
          include: /src/,
          use: [
            fileLoader('[path][name].wxss'),
            require.resolve('sass-loader')
          ]
        },
        {
          test: /.wxs$/,
          use: [
            fileLoader('[path][name].[ext]'),
            require.resolve('babel-loader'),
            xmgLoader,
          ]
        },
        {
          test: /\.json/,
          type: 'javascript/auto',
          use: [
            fileLoader('[path][name].[ext]'),
            xmgLoader
          ]
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          include: /src/,
          use: fileLoader('[path][name].[ext]')
        }
      ]
    },
    optimization: {
      minimize: !!Boolean(option.terser),
      // 始终开启压缩，以保证在开发模式可以预览
      splitChunks: {
        cacheGroups: {
          commons: {
            name: 'commons',
            chunks: 'initial',
            minChunks: 2
          }
        }
      }
    },
    mode: 'development',
    target: 'node',
    devtool: false,
    watchOptions: {
      ignored: /node_modules|dist/,
      poll: 1000
    }
  }

  const compiler = webpack(webpackConfig);
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
  .option('-s, --src [value]', '编译目录', 'src')
  .option('-e, --env [value]', '打包环境env', 'peanut')
  .option('-t, --terser [value]', '压缩JS', true)
  .option('-c, --module [value]', '模块名称', '')
  .action(option => {
    webpackBuild(option);
  })



program.parse(process.argv)