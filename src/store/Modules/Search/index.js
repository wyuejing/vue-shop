// 引入 api
import { serachGoods } from '@/api'

const state = {
  serachList: []
}
const getters = {
  attrsList(state) {
    return state.serachList.attrsList || []
  },
  goodsList(state) {
    return state.serachList.goodsList || []
  },
  trademarkList(state) {
    return state.serachList.trademarkList || []
  }
}
const mutations = {
  // 将请求存入 state
  SETSEARCHGOODS(state, goods) {
    state.serachList = goods
  }
}
const actions = {
  // 发起搜索请求
  async getSearchGoods({ commit }, data = {}) {
    const res = await serachGoods(data)
    if (res.code === 200) {
      commit('SETSEARCHGOODS', res.data)
    }
    // console.log(res.data)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
