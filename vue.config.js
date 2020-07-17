const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
  }
  const isProduction = process.env.NODE_ENV === 'production'
  const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  configureWebpack: config => {
    if (isProduction) {
      // 代码压缩
      config.plugins.push(
        new TerserPlugin({
          terserOptions: {
            // 生产环境自动删除console
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log'] // 移除console
            }
          },
          sourceMap: false,
          parallel: true
        })
      )
    }

  },
    chainWebpack(config) {
        // it can improve the speed of the first screen, it is recommended to turn on preload
        // it can improve the speed of the first screen, it is recommended to turn on preload
  
    
        // set svg-sprite-loader
        config.module
        .rule('svg')
        .exclude.add(resolve('src/icons'))
        .end()
      config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(resolve('src/icons'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        })
        .end()
}
}
