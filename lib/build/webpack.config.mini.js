const path = require('path');
const merge = require('webpack-merge');
const MiniProgramPlugin = require('../src/index.js').plugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const baseConfig = require('./webpack.config.base');


const resolve = (file) => path.resolve(process.cwd(), file);

// global.context = resolve('./test/src/')

module.exports = merge(baseConfig, {
  plugins: [
    new MiniProgramPlugin(),
    new CleanWebpackPlugin()
  ]
});

