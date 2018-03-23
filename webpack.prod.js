/**
 *
 * @type {webpack}
 */
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const context = ''

process.env.NODE_ENV = 'production'

module.exports = {
  entry: [
    './src/index.tsx'
  ],
  output: {
    path: __dirname + '/build/',
    filename: 'bundle' + '.min.js',
    publicPath: `${context}/login/build/prod/`
  },
  resolve: {
    extensions: ['.js', 'jsx', '.ts', '.tsx']
  },
  module: {
    loaders: [
      {test: /\.(ts|tsx)$/, loaders: ['babel-loader?cacheDirectory', 'awesome-typescript-loader?useCache']},
      {test: /\.less$/, loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader', 'less-loader']})},
      {test: /\.scss$/, loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader', 'sass-loader']})},
      {test: /\.(jpg|png|svg)$/, loader: 'url-loader?limit=8192'},
      {test: /\.(eot|woff|woff2|ttf)([\?]?.*)$/, loader: 'file-loader'}
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin('style' + '.min.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: false
    })
  ]
}
