import request from '@/utils/request.js'

// 首页三级分类 请求 无参数
export function getBaseCategoryList() {
  return request({
    url: '/product/getBaseCategoryList',
    method: 'get'
  })
}
