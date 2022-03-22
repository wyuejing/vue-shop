## 将静态页面放置于vue项目中

## 路由相关

### 1.非路由组件及路由组件

​	非路由组件放置于components文件夹中

​	路由组件放置于views文件夹中

### 2.配置路由

​	配置路由信息，然后在vue实例安装路由

​	因为有些组件在一些页面不显示，我们通过 **v-show** 来控制

​	如果有很多页面需要配置，则在 APP 组件中使用 $route 会很不方便，在这里使用 路由元信息 **meta** ，

​	**meta可以在路由地址和导航守卫上都被访问到**。

```js
// router文件
{
    path: '/home',
    component: () => import('@/views/Home/index.vue'),
    meta: { show: true }
}
// App.vue
v-show="$route.meta.show"
```

### 3.路由传递参数

**（要向搜索页传递参数，然后在搜索页初始化的时候发起请求）**

​	三种方法 拼接字符串 、模板字符串 、对象

```js
// path 可以和 params 一起使用吗？ 不能
// 路由跳转传参的时候，对象的写法可以是 path | name
// 使用name需要给对应路由加上 name 配置项，而且 path 写法 不能 和 params 参数一起使用

// 如何控制 params 参数可传可不传？
// 在配置路由的时候，在占位的后面加上一个问号
{
    path: '/search/:keywords?',
    name: 'search'
}

// params 参数可传可不传时，如果 params 传递的是空串怎么办？
// 使用 undefined 解决
this.$router.push({name: 'search', params: {keywords: '' || undefined}, query: {key: 'value'}})
```

​	路由组件可以使用 **props** 传递参数，三种方法（使用props传，**需要在组件里进行接收**）

```js
// 都是在路由配置项里写
props: true // 布尔值写法
props: { a: 1 } // 对象写法 额外给路由组件传递参数
props: ($route) => {
      // 函数写法
      return { k: $route.params.keywords }
}
```

​	实际上上面三种都不常用，通常直接使用 *$route.params.keywords* 获取

### 4.重写路由 push 和 replace

```js
import VueRouter from 'vue-router'
// 保存备份
const originPush = VueRouter.prototype.push
// 重写 VueRouter 的 push 和 replace 方法
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    // 如果不去改变this指向，则会变成 window 调用 push
    // 函数里的 this 是谁调用指向谁，调用者其实就是路由的实例
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
```

### 5.路由跳转

​	点击三级联动中的文字，会跳转到 search 页面，并且携带参数（比如 点击 手机，则手机会出现在路由参数query中

​	采用 <router-link>的方式，会出现卡顿现象。（数据可能很多，需要渲染很多个，因为它是组件，如果大量渲染会很消耗内存）

​	而采用编程式导航，在每个标签上绑定事件，如果循坏了很多，则会绑定很多事件。

​	所以我们采用 **事件委托 + 编程式导航**的方式，规避以上两个问题

> 全部子节点都会委派给父节点，我们点击a才会跳转，**你怎么知道点的是a？**
>
> 如果确定了是a,**如何区分是哪级分类的标签？**
>
> ​	两题都是给a添加自定义属性
>
> 最后将事件属性中的自定义属性解构出来，进行判断，然后实现逻辑
>
> ​	**event.target.dataset**

### 6.路由参数合并

​	在三级联动中，点击后页面跳转，只有 query 参数，而此时再点击搜索按钮，就变成了只有 params 参数，如果在点击了三级联动，跳转页面后，还在搜索框中输入内容，进行搜索，需要将参数合并在一起。

```js
// 页面跳转后，组件其实都是重新渲染过的，只是路由参数对象存了跳转时的参数，所以判断一下是否存在即可
const location = {
    name: 'search',
    params: { keywords: this.keywords || undefined }
}
// 搜索框的是 params ，所以判断是否有 query
if (this.$route.query) {
    location.query = this.$route.query
    this.$router.push(location)
} else {
	this.$router.push(location)
}
```



## 网络请求部分

### 1.对 axios  进行二次封装

**（对返回的数据提前做一些通用的处理）**

```js
import axios from 'axios'
// 创建 axios 实例
const request = axios.create({
  // 基础路径
  baseURL: '/api',
  // 超时时间
  timeout: 5000
})
// 请求拦截器
request.interceptors.request.use((config) => {
  return config // 一定要返回，可以在返回前做一些配置
})
// 响应拦截器
request.interceptors.response.use(
  (res) => {
    return res // 一定要返回，否则浏览器收不到响应
  },
  (err) => {
    return Promise.reject(new Error(err))
  }
)
export default request
```

### 2.配置代理

**（如果服务器没有解决跨域，则前端需要进行处理）**

```js
module.exports = {
  devServer: {
    proxy: {
      // 当我们的本地的请求有 /api 的时候，就会代理我们的请求地址向另外一个服务器发出请求
      '/api': {
        target: 'http://39.98.123.211', // 跨域请求的地址
        changeOrigin: true // 只有这个值为true的情况下 才表示开启跨域
      }
    }
  }
}
```

​	**配置好后记得将项目关掉重启**

## 数据统一管理

### vuex

​	分模块管理 modules

```js
// 使用了命名空间 mapstate 需要加上 名称 才可以获取state
computed: {
    ...mapState('home', ['categoryList']), // 第一种 数组方式
    // 第二种 对象
    ...mapState({
      categoryList: (state) => state.home.categoryList 
    }) 
}
```

​	三级联动： 注意 v-for 的位置，放错模块，数据可能会显示不出，而且不报错

### 原版存在一些问题

​	进行页面跳转时，三级联动组件会销毁，然后再次跳转回来时，又再次调用了actions中请求数据的函数，**相当于没有进行状态管理**，而且 `vuex` 在页面刷新后数据就丢失了，还得重新请求。

​	解决：采用`sessionStorage`缓存的方式，只要页面不关闭，则只需请求一次即可

```js
// utils/category.js
// 存储 category 信息
export function setCategoryList(value) {
  // 存数组需要进行JSON序列化
  return sessionStorage.setItem('category', JSON.stringify(value))
}
// 获取 category 信息
export function getCategoryList() {
  //   const category = sessionStorage.getItem('category')
  return JSON.parse(sessionStorage.getItem('category'))
}

// 组件中
created() {
    // 组件有了配置项后，立马调用actions中的方法，发起请求，存储分类列表
    // 如果有缓存，则不再发送请求
    if (!getCategoryList()) {
      this.$store.dispatch('home/getCategoryList')
    }
}

// vuex 的 home 中
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
```

​	后续视频中的处理方法

```js
// 在 app 组件的 created 生命周期中调用 actions 中的请求方法
created() {
      this.$store.dispatch('home/getCategoryList')
}
```

​	em。。。就当复习`sessionStorage`缓存了。。。

## 样式处理

```js
// css实现 鼠标悬浮，添加背景颜色
h3:hover {
    background: #ccc;
}
// js 实现
// 将 index 存起来，然后动态绑定 class 判断 index 是否相同，来决定是否加样式
@mouseenter=“currentIndex = index”
data() {return {cuttentIndex: -1}}
:class="{ itemHover: currentIndex == index }"
```

## 处理可能出现的卡顿

​	如果用户操作速度很快，而解析器需要事件处理逻辑，有可能出现卡顿现象

​	我们使用节流的方法，减少事件触发的频率

​	使用 lodash 的throttle ，有些包有对它的引用，即使我们没主动下载，它也会帮我们下载

```js
// 按需引入 减少项目体积
import throttle from 'lodash/throttle.js'

getCurrentIndex: throttle(function (index) {
	this.currentIndex = index
}, 30),
```

## mock数据

```js
// 第一步 下载 mockjs 
// 创建mock文件夹，配置JSON数据，在mockServe.js文件中
// 利用mockjs来mock数据接口
import Mock from 'mockjs'
import banners from './banner.json'
import floors from './floors.json'
// 提供广告位轮播数据的接口
Mock.mock('/mock/banners', {
  code: 200,
  data: banners
})
// 提供所有楼层数据的接口
Mock.mock('/mock/floors', {
  code: 200,
  data: floors
})
// webpack 默认对外暴露的：图片、JSON数据格式，所以JSON文件没有暴露也可以引入
// 在main.js中引入mockServe文件（重要）
// 然后就按照常规操作，配置axios，封装api，调用api，存储数据，使用数据
```

## swiper

### 1.使用

​	引入相关包及样式	需要有结构	创建swiper实例，将结构挂载到实例上

### 2.什么时候创建实例才能生效？

​	因为数据是从服务器传回来的，而Ajax请求是异步的，所以在mounted创建实例会导致数据还没有渲染到页面，就把对象挂载到 swiper 实例中了，所以轮播图没法生效

#### 	解决：使用 watch + nextTick 

```js
const state = {
  bannerList: [], // 仓库中的数据一开始是空数组
}
<div class="swiper-slide" v-for="banner in bannerList" :key="banner.id">
  <img :src="banner.imgUrl" />
</div>
computed: {
    ...mapState({// 获取store中的数据，作为computed的依赖项，因为仓库中的数据是http请求获取的，需要消耗时间，所以一开始获取到的是空数组，页面不渲染（虽然我们可能看不到），只要数据发生改变，立马渲染DOM
      bannerList: (state) => state.home.bannerList
    })
}
// 只 使用 watch ，我们能获取到数据发生变化了，但是这时如果直接 new Swiper() ,也无法成功，因为数据更新，要渲染DOM，也是需要消耗时间的，哪怕只需要一点点时间，结构都没有，怎么轮播？
watch: {
    bannerList: {
        immediate: true,
        handler() {
            this.$nextTick(() => {
                var mySwiper = new Swiper ('.swiper', {
                    loop: true, // 循环模式选项
                    pagination: { // 如果需要分页器
                      el: '.swiper-pagination',
                    },
                    navigation: { // 如果需要前进后退按钮
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev',
                    }
                })        
            })
        }
    }
}
// this.$nextTick:将回调延迟到【下次 DOM 更新循环之后】执行。在【修改数据之后】立即使用它，然后等待 DOM 更新。
// 也就是说 数据返回过来了，就会立即使用它，但是它会等待 DOM 更新，更新完后，才执行回调
// 所以使用 watch 可以监听到数据变化，nextTick 可以等待到 DOM 更新完成，有了结构，所以可以 new Swiper 了
```

​	bug：偶尔出现 banner 无法轮播的问题，可能是因为在 app 组件中发请求，获取数据的速度非常快，在这个组件中，直接拿到了数据，所以 不会 再改变，watch 则监听不到变化，所以加上 immediate：true

