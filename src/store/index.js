import Vue from 'vue'
import Vuex from 'vuex'
// 引入小仓库
import home from '@/store/Modules/Home'
import search from '@/store/Modules/Search'
import detail from '@/store/Modules/Deatil'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    home,
    search,
    detail
  }
})

export default store
