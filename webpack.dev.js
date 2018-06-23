const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')
const webpack = require('webpack')
const NpmInstallPlugin = require('npm-install-webpack-plugin')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  entry: {
    app: [
      'eventsource-polyfill',
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=5000'
    ]
  },
  output: {
    publicPath: '/'
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new NpmInstallPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('dev'),
      'process.env.BABEL_ENV': JSON.stringify('dev')
    })
  ],
  devServer: {
    host: '0.0.0.0',
    compress: true,
    clientLogLevel: 'info',
    hot: true,
    contentBase: path.join(__dirname, 'public'),
    watchContentBase: true,
    open: false,
    overlay: {
      warnings: true,
      errors: true
    },
    port: 1990,
    proxy: {
      '/api': 'http://localhost:3000'
    },
    useLocalIp: true,
    stats: 'minimal'
  }
})
