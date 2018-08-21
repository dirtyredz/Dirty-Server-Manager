const path = require("path");
const WrapperPlugin = require('wrapper-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const node = {
  watch: true,
  mode: 'development',
  target: 'node',
  entry: {
    dsm: "./src/bin/dsm.js",
    serverWrapper: './src/bin/serverWrapper.js',
    webServer: './src/bin/webServer.js',
  },
  output: {
    path: path.resolve(__dirname, "dsm"),
    filename: "[name].js",
  },
  plugins: [
    new CleanWebpackPlugin(['dsm/dsm.lua','dsm/config.ini'],{watch: true}),
    new CopyWebpackPlugin([
      './src/dsm.lua',
      './src/config.ini'
    ]),
    new WebpackShellPlugin({onBuildExit:['npm install -g ./','dsm stop-web && dsm start-web']}),
    // strict mode for the whole bundle
    new WrapperPlugin({
      test: /\.js$/, // only wrap output of bundle files with '.js' extension 
      header: function (fileName) {
        return '#!/usr/bin/env node\n';
      }
    })
  ],
  externals: (ctx, req, done) => (/^node-pty$/.test(req) ? done(null, `commonjs ${req}`) : done()),
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
              [
                "babel-preset-env",
                {
                  "targets": {
                    "node": "current"
                  }
                }
              ]
            ]
          }
        }
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: "/#!\/usr\/bin\/env node/"
          },
        }
      })
    ]
  },
}
const react = {
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
          'style-loader',
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
  entry: {
      webClient: './src/website/index.js'
  },
  plugins:[
    new CleanWebpackPlugin(['dsm/public/*']),
    new HtmlWebpackPlugin({
      template: './src/website/public/index.html'
    })
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dsm/public'),
    publicPath: '/public/'
  }
};
module.exports = [node,react]