import { getGoodDetail } from '@/api'

const state = {
  goodDetailObj: {}
}
const mutations = {
  SETGOODDETAIL(state, goodDetailObj) {
    state.goodDetailObj = goodDetailObj
  }
}
const actions = {
  async getGoodDetail({ commit }, stuId) {
    const res = await getGoodDetail(stuId)
    commit('SETGOODDETAIL', res.data)
  }
}
const getters = {
  categoryView(state) {
    return state.goodDetailObj.categoryView || {}
  },
  price(state) {
    return state.goodDetailObj.price || 0
  },
  spuSaleAttrList(state) {
    return state.goodDetailObj.spuSaleAttrList || []
  },
  skuInfo(state) {
    return state.goodDetailObj.skuInfo || {}
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
