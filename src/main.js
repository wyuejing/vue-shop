import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全局样式
import '@/assets/reset.css'
// 引入组件注册为全局组件
import TypeNav from '@/components/TypeNav'
Vue.component('type-nav', TypeNav)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
