import Vue from 'vue'
import VueRouter from 'vue-router'
import './rewrite.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('@/views/Home/index.vue'),
    meta: { show: true }
  },
  {
    path: '/search/:keyword?', // 传递 params 参数，问号表示可传可不传
    component: () => import('@/views/Search/index.vue'),
    meta: { show: true },
    name: 'search'
  },
  {
    path: '/login',
    component: () => import('@/views/Login/index.vue'),
    meta: { show: false }
  },
  {
    path: '/register',
    component: () => import('@/views/Register/index.vue'),
    meta: { show: false }
  },
  {
    path: '/detail/:id',
    component: () => import('@/views/Detail/index.vue'),
    meta: { show: true }
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 }
  }
})

export default router
