const path = require('path')
const webpack = require('webpack')

const port = 3080

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './src/index.tsx'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
    chunkFilename: '[name].chunk.js'
  },
  resolve: {
    extensions: ['.js', 'jsx', '.ts', '.tsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"dev"'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/, loaders: [ 'babel-loader?cacheDirectory'],
        exclude: /node_modules/
      },
      {test: /\.(ts|tsx)$/, loader: 'awesome-typescript-loader?useCache '},
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.less$/, loaders: ['style-loader', 'css-loader?sourceMap', 'postcss-loader', 'less-loader']},
      {test: /\.scss$/, loaders: ['style-loader', 'css-loader?sourceMap', 'postcss-loader', 'sass-loader']},
      {test: /\.(jpg|png|svg)$/, loader: 'url-loader?limit=8192'},
      {test: /\.(eot|woff|woff2|ttf)([\?]?.*)$/, loader: 'file-loader'}
    ]
  }
}
