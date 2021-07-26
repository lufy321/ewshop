module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'network': '@/network',
        'utils': '@/utils',
        'views': '@views'
      }
    }
  },
  publicPath: './',

  lintOnSave: false,
  devServer: {
    host: '192.168.0.102', // ip
    port: 8089, // 设置端口号
    https: false, // https:{type:Boolean}
    open: false, //配置自动启动浏览器
    proxy:null  //设置代理
  }
}