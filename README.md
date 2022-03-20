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

​	三种方法 拼接字符串 模板字符串 对象

```js
// path 可以和 params 一起使用吗？
// 路由跳转传参的时候，对象的写法可以是 path | name
// 使用name需要给对应路由加上 name 配置项，而且 path 写法不能和 params 参数一起使用

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

