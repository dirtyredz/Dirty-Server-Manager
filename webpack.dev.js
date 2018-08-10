const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = merge(common, {
  watch: true,
  mode: 'development',
  plugins: [
    new WebpackShellPlugin({onBuildEnd:['npm install -g ./']})
  ]
});