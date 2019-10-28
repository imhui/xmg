const path = require('path');
const merge = require('webpack-merge');
const MiniProgramPlugin = require('../src/index.js').plugin;

const resolve = (file) => path.resolve(process.cwd(), file);

global.context = resolve('./src/')

const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
  context: global.context,
  entry: resolve('src/app.json'),
  output: {
    path: resolve('dist/peanut')
  },
  plugins: [
    new MiniProgramPlugin(),
    new CopyWebpackPlugin([
      {
        from: resolve('src/icons/'),
        to: resolve('dist/peanut/icons')
      },
      {
        from: resolve('project.config.json'),
        to: resolve('dist/project.config.json')
      }
    ])
  ]
});

