module.exports = {
  devServer: {
    proxy: {
      // 当我们的本地的请求有 /api 的时候，就会代理我们的请求地址向另外一个服务器发出请求
      '/api': {
        target: 'http://39.98.123.211', // 跨域请求的地址
        changeOrigin: true // 只有这个值为true的情况下 才表示开启跨域
      }
    }
  }
}
