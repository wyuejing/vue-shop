import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全局样式
import '@/assets/reset.css'
// 引入字体图标
import '@/assets/iconfont.css'
// 引入 swiper 样式
import 'swiper/css/swiper.css'
// 引入组件注册为全局组件
import TypeNav from '@/components/TypeNav'
import Pagination from '@/components/Pagination'
// 引入 mock
import '@/mock/mockServe.js'

Vue.component('type-nav', TypeNav)
Vue.component('page-nav', Pagination)

Vue.config.productionTip = false

new Vue({
  // 配置全局时间总线
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
