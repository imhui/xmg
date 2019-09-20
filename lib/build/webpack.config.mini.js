const path = require('path');
const merge = require('webpack-merge');
const MiniProgramPlugin = require('../src/index.js').plugin;

const resolve = (file) => path.resolve(__dirname, '../../test/', file);

global.context = resolve('./src/')

const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
  context: global.context,
  entry: resolve('src/app.json'),
  output: {
    path: resolve('dist/peanut')
  },
  plugins: [
    new MiniProgramPlugin()
  ]
});

