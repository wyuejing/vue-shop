import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

// 创建 axios 实例
const mockRequest = axios.create({
  // 基础路径
  baseURL: '/mock',
  // 超时时间
  timeout: 5000
})
// 请求拦截器
mockRequest.interceptors.request.use((config) => {
  // 发起请求，进度条开启
  nprogress.start()
  return config
})
// 响应拦截器
mockRequest.interceptors.response.use(
  (res) => {
    // 收到响应，进度条关闭
    nprogress.done()
    return res
  },
  (err) => {
    return Promise.reject(new Error(err))
  }
)

export default mockRequest
