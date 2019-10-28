const path = require('path');
const merge = require('webpack-merge');

const resolve = (file) => path.resolve(process.cwd(), file);
global.context = resolve('src/plugin');

const baseConfig = require('./webpack.config.base');

module.exports = [merge(baseConfig, {
  context: global.context,
  entry: resolve('src/plugin/plugin.json'),
  output: {
    path: resolve('dist/plugin')
  },
  plugins: [
    // new MiniProgramPlugin({
    //   forPlugin: true
    // }),
    // new CopyWebpackPlugin([
    //   {
    //     from: resolve('doc'),
    //     to: resolve('dist/doc')
    //   },
    //   {
    //     from: resolve('project.config.json'),
    //     to: resolve('dist/project.config.json')
    //   }
    // ])
  ]
}), merge(baseConfig, {
  context: global.context,
  entry: {
    index: resolve('src/plugin/index')
  },
  output: {
    path: resolve('dist/plugin'),
    libraryTarget: 'umd'
  }
})];
