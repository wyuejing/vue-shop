// 引入请求api
import { getBaseCategoryList } from '@/api'
import { setCategoryList, getCategoryList } from '@/utils/category.js'

const state = {
  categoryList: getCategoryList() // categoryList 持久化 => 放入缓存
}
const mutations = {
  // 设置分类列表数据
  SETCATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
    // 设置 sessionStorage
    setCategoryList(categoryList)
  }
}
const actions = {
  // actions 里的函数默认可以收到一个store上下文对象，将commit结构出来
  async getCategoryList({ commit }) {
    // 调用接口，获取分类列表数据
    const { data: res } = await getBaseCategoryList()
    // res 数据过多，截取部分
    res.splice(-4)
    // 把数据传给mutations里的方法，进而控制state中的数据
    commit('SETCATEGORYLIST', res)
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
