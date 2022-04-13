import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 引入UUID
import { getUUID } from './uuid_token.js'

// 创建 axios 实例
const request = axios.create({
  // 基础路径
  baseURL: '/api',
  // 超时时间
  timeout: 5000
})
// 请求拦截器
request.interceptors.request.use((config) => {
  // 添加游客标识
  config.headers.userTempId = getUUID()
  // 查看有无token
  const token = JSON.parse(localStorage.getItem('TOKEN'))
  if (token) {
    config.headers.token = token
  }
  // 发起请求，进度条开启
  nprogress.start()
  return config
})
// 响应拦截器
request.interceptors.response.use(
  (res) => {
    // 收到响应，进度条关闭
    nprogress.done()
    // 对响应数据进行处理 axios 默认会给数据套上一个壳, 把里面的数据结构出来
    const { data } = res
    return data
  },
  (err) => {
    return Promise.reject(new Error(err))
  }
)

export default request
