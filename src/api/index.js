import request from '@/utils/request.js'
import mockRequest from '@/utils/mockRequest.js'

// 首页三级分类 请求 无参数
export function getBaseCategoryList() {
  return request({
    url: '/product/getBaseCategoryList',
    method: 'get'
  })
}

// 搜索商品
export function serachGoods(data) {
  return request({
    method: 'post',
    url: '/list',
    data
  })
}

// 获取轮播图数据
export function getBannerList() {
  return mockRequest({
    url: '/banners',
    method: 'get'
  })
}

// 获取floors数据
export function getFloorsList() {
  return mockRequest({
    url: '/floors',
    method: 'get'
  })
}
