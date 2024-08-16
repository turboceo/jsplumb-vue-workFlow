const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}

let mix = Object.assign
let isDev = process.env.NODE_ENV === 'development'

module.exports = {
  publicPath: './',
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
    mix(config, {
      externals: {
        vue: "Vue",
        "element-ui": "ELEMENT",
        "vue-router": "VueRouter",
        axios: "axios",
        vuex: "Vuex",
      },
      cache: {
        // 使用文件缓存，加速二次构建
        type: isDev ? "memory" : "filesystem",
      },
    })
  },
  devServer: {
    port: 8081
  },
  productionSourceMap: false
}