// 引入请求api
import { getBaseCategoryList, getBannerList, getFloorsList, getUserLoginInfo } from '@/api'
// session操作
import { setCategoryList, getCategoryList } from '@/utils/category.js'

const state = {
  categoryList: getCategoryList(), // categoryList 持久化 => 放入缓存
  bannerList: [],
  floorsList: [],
  userInfo: {}
}
const mutations = {
  // 设置分类列表数据
  SETCATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
    // 设置 sessionStorage
    setCategoryList(categoryList)
  },
  // 设置 banner 数据
  SETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  // 设置 floors 数据
  SETFLOORSLIST(state, floorsList) {
    state.floorsList = floorsList
  },
  // 存储用户信息
  SETUSERINFO(state, info) {
    state.userInfo = info
  }
}
const actions = {
  // actions 里的函数默认可以收到一个store上下文对象，将commit结构出来
  async getCategoryList({ commit }) {
    // 调用接口，获取分类列表数据
    const { data: res } = await getBaseCategoryList()
    // res 数据过多，截取部分
    if (res.length > 15) {
      res.splice(15)
    }
    // 把数据传给mutations里的方法，进而控制state中的数据
    commit('SETCATEGORYLIST', res)
  },
  async getBannerList({ commit }) {
    const { data: res } = await getBannerList()
    commit('SETBANNERLIST', res.data)
  },
  async getFloorsList({ commit }) {
    const { data: res } = await getFloorsList()
    commit('SETFLOORSLIST', res.data)
  },
  // 获取用户登录信息
  async getUserLoginInfo({ commit }) {
    const res = await getUserLoginInfo()
    if (res.code === 200) {
      commit('SETUSERINFO', res.data)
    } else {
      commit('SETUSERINFO', {})
      console.log('未登录')
    }
  }
}
const getters = {
  getnickName(state) {
    return state.userInfo.nickName || ''
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
