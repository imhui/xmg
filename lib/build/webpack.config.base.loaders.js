const path = require('path');

const fileLoader = name => ({
  loader: require.resolve('file-loader'),
  options: {
    publicPath: '',
    context: global.context || path.resolve(__dirname,  '../../test/', 'src'),
    name
  }
});

const xmgLoader = require.resolve('../src/index.js')

module.exports = [
  {
    test: /\.js$/,
    // include: path.resolve(__dirname, '../plugin'),
    // exclude: path.resolve(__dirname,  '../../test/', 'node_modules'),
  //   include: [
  //     path.resolve(__dirname, '../node_modules/peanut-all')
  // ],
    use: [
      // require.resolve('cache-loader'),
      'cache-loader',
      'babel-loader',
      'eslint-loader'
    ],
  },
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
      'sass-loader'
    ]
  },
  // {
  //   test: /\.pcss$/,
  //   use: [
  //     fileLoader('[path][name].wxss')
  //   ]
  // },
  {
    test: /.wxs$/,
    use: [
      fileLoader('[path][name].[ext]'),
      'babel-loader',
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
];
