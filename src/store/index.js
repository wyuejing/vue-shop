import Vue from 'vue'
import Vuex from 'vuex'
// 引入小仓库
import home from '@/store/Modules/Home'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    home
  }
})
