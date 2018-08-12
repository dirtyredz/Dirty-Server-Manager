const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const WebpackShellPlugin = require('webpack-shell-plugin');

 dev = {
  watch: true,
  mode: 'development',
  plugins: [
    new WebpackShellPlugin({onBuildEnd:['npm install -g ./']})
  ]
};

module.exports = [ merge(common[0],dev), merge(common[1],dev) ]