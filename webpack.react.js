const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'
module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "react",
              "env",
              "stage-0"
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  
  plugins: [ 
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    })
  ],
  entry: {
      webClient: './src/website/index.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './src/website/public',
    hot: true,
    historyApiFallback: {
      index: 'index.html'
    },
    stats: {
      // Add chunk information (setting this to `false` allows for a less verbose output)
      chunks: false,
      
      // Add namedChunkGroups information
      chunkGroups: false,
  
      // Add built modules information to chunk information
      chunkModules: false,
  
      // Add the origins of chunks and chunk merging info
      chunkOrigins: false,
      // Add asset Information
      assets: false,
      // Add built modules information
      modules: false,
      // Show dependencies and origin of warnings/errors (since webpack 2.5.0)
      moduleTrace: false,
      // Display the entry points with the corresponding bundles
    entrypoints: false,
    },
  },
  // plugins: [
  //   // new CleanWebpackPlugin(['dist']),
  //   // new HtmlWebpackPlugin({
  //   //   title: 'Hot Module Replacement'
  //   // }),
  //   // new webpack.HotModuleReplacementPlugin()
  // ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
};