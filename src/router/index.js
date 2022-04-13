import Vue from 'vue'
import VueRouter from 'vue-router'
import './rewrite.js'
// 引入vuex仓库
import store from '@/store'
// 退出登录
import { logOut } from '@/api'

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
    path: '/addcartsuccess',
    name: 'addcartsuccess',
    component: () => import('@/views/AddCartSuccess/index.vue'),
    meta: { show: true }
  },
  {
    path: '/shopcart',
    name: 'shopcart',
    component: () => import('@/views/ShopCart/index.vue'),
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

router.beforeEach(async (to, from, next) => {
  const token = JSON.parse(localStorage.getItem('TOKEN'))
  // 如果没有token
  if (!token) {
    next()
  } else {
    // 如果有token（表示已登录），且跳转到login，则不放行
    if (to.path === '/login') {
      next('/home')
    } else {
      // 刷新会使header的用户信息不见，vuex的信息刷新后丢失，但是token还在，所以我们在路由跳转时，重新获取数据
      if (!store.state.home.userInfo.nickName) {
        try {
          await store.dispatch('home/getUserLoginInfo')
          next()
        } catch (e) {
          // token失效，退出登录，删除token，跳转到login页面
          await logOut()
          localStorage.removeItem('TOKEN')
          next('/login')
        }
      } else {
        next()
      }
    }
  }
})

export default router
