const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const NpmInstallPlugin = require('npm-install-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  devtool: isDev ? 'inline-source-map' : 'none',
  entry: {
    'index': [
      'eventsource-polyfill',
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      path.join(__dirname, 'app', 'src', 'Index.js')
    ]
  },
  output: {
    path: path.join(__dirname, '/build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app', 'public', 'index.html')
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[name].css'),
    new NpmInstallPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: path.join(__dirname, 'node_modules/'),
        use: ['babel-loader'],
        include: path.join(__dirname, 'app', 'src')
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?minimize=true&modules=true&localIdentName=[name]__[local]',
            'sass-loader'
          ]
        })
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [{
          /* inline if smaller than 10 KB, otherwise load as a file */
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      },
      {
        test: /\.(eot|svg|ttf|woff2?|otf)$/,
        use: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    host: '0.0.0.0',
    compress: true,
    clientLogLevel: 'info',
    hot: true,
    contentBase: path.join(__dirname, '/public'),
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
}
