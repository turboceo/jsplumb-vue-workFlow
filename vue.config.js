const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
  },
  devServer: {
    port: 8081
  },
  productionSourceMap: false
}