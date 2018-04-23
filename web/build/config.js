'use strict'
const pkg = require('../package')

module.exports = {
  title: 'ticket-system-web',
  // Options for webpack-dev-server
  // See https://webpack.js.org/configuration/dev-server
  devServer: {
    host: 'localhost',
    port: 3000
  },
  // when you use electron please set to relative path like ./
  // otherwise only set to absolute path when you're using history mode
  publicPath: '/',
}
