const path = require('path');

const resolve = (file) => path.resolve(process.cwd(), file);

// console.log(require.resolve('babel-loader'));

const fileLoader = name => ({
  loader: require.resolve('file-loader'),
  options: {
    publicPath: '',
    context: global.context || path.resolve(process.cwd(), 'src'),
    name
  }
});

const xmgLoader = require.resolve('../src/index.js')

module.exports = [
  // {
  //   enforce: 'pre',
  //   test: /\.js$/,
  //   exclude: /node_modules/,
  //   loader: require.resolve('eslint-loader'),
  //   options: {
  //     eslintPath: resolve('node_modules/eslint')
  //   }
  // },
  // {
  //   test: /\.js$/,
  //   use: [
  //     require.resolve('cache-loader'),
  //     {
  //       loader: require.resolve('babel-loader'),
  //       options: {
  //         babelrcRoots: [
  //           // Also consider monorepo packages "root" and load their .babelrc files.
  //           './',
  //           resolve('./')
  //         ]
  //       }
  //     }
  //   ],
  // },
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
];
