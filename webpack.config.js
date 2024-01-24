const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpackConfig = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  entry: './src/index.js',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    static: {
      directory: __dirname,
    },
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/dist/',
    libraryTarget: 'umd',
    library: 'GifPlayer',
    libraryExport: 'default',
    filename: 'gifplayer.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  externals: {
    'prop-types': {
      root: 'PropTypes',
      commonjs: 'prop-types',
      commonjs2: 'prop-types',
      amd: 'prop-types'
    },
    'react': {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    }
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'gifplayer.css' })
  ],
  optimization: {
    emitOnErrors: true,
    minimize: false
  }
};

module.exports = webpackConfig;
