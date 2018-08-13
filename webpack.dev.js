const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const WebpackShellPlugin = require('webpack-shell-plugin');

 dev = {
  watch: true,
  mode: 'development',
  plugins: [
    new WebpackShellPlugin({onBuildExit:['npm install -g ./']})
  ]
};

module.exports = merge(common,dev)