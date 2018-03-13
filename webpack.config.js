const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const NpmInstallPlugin = require('npm-install-webpack-plugin')

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    path.join(__dirname, 'app', 'src', 'components', 'App.js')
  ],
  output: {
    path: path.join(__dirname, 'build'),
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
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        /* We'll leave npm packages as is and not
           parse them with Babel since most of them
           are already pre-transpiled anyway. */
        exclude: /node_modules/,
        use: ['babel-loader']
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
    contentBase: './public',
    watchContentBase: true,
    open: true,
    overlay: true,
    port: 1990,
    proxy: {
      '/api': 'http://localhost:3000'
    },
    useLocalIp: true,
    stats: 'minimal'
  }
}
