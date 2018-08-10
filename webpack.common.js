const path = require("path");
const WrapperPlugin = require('wrapper-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
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
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "babel-preset-env", {
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
  plugins: [
    // strict mode for the whole bundle
    new WrapperPlugin({
      test: /\.js$/, // only wrap output of bundle files with '.js' extension 
      header: function (fileName) {
        return '#!/usr/bin/env node\n';
      }
    })
  ],
  externals: (ctx, req, done) => (/^node-pty$/.test(req) ? done(null, `commonjs ${req}`) : done())
};