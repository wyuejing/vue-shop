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

// 获取商品详情
export function getGoodDetail(skuId) {
  return request({
    method: 'get',
    url: `/item/${skuId}`
  })
}

// 将产品添加到购物车
export function addToCart(skuId, skuNum) {
  return request({
    method: 'post',
    url: `/cart/addToCart/${skuId}/${skuNum}`
  })
}

// 获取购物车列表
export function getCartList() {
  return request({
    method: 'get',
    url: '/cart/cartList'
  })
}

// 切换商品选中状态
export function setGoodsChecked(skuId, isChecked) {
  return request({
    method: 'get',
    url: `/cart/checkCart/${skuId}/${isChecked}`
  })
}

// 删除购物车商品
export function deleteGood(skuId) {
  return request({
    method: 'delete',
    url: `/cart/deleteCart/${skuId}`
  })
}
