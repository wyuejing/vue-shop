import { getGoodDetail } from '@/api'

const state = {
  goodDetailObj: {}
}
const mutations = {
  SETGOODDETAIL(state, goodDetailObj) {
    // 如果获取到的数据为null,直接return出去，不然goodDetailObj变成了null，会造成一些报错
    if (!goodDetailObj) return
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
