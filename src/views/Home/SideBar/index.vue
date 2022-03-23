<template>
  <div class="side-bar" ref="sidebar" :class="{ is_fixed: isFixed }">
    <ul>
      <li>
        <a href="javascript:void(0);">
          <span :class="{ active: isActive }">今日推荐</span>
          <span class="line"></span>
        </a>
      </li>
      <li>
        <a href="javascript:void(0);">
          <span>热卖排行</span>
          <span class="line"></span>
        </a>
      </li>
      <li>
        <a href="javascript:void(0);">
          <span>猜你喜欢</span>
          <span class="line"></span>
        </a>
      </li>
      <li>
        <a href="javascript:void(0);">
          <span>特色优选</span>
          <span class="line"></span>
        </a>
      </li>
      <li>
        <a href="javascript:void(0);">
          <span class="iconfont icon-customer"></span>
          <span>客服</span>
          <span class="line cur"></span>
        </a>
      </li>
      <li @click="goTop">
        <a href="javascript:void(0);">
          <span class="iconfont icon-fanhuidingbu"></span>
          <span>顶部</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
// 引入自定义节流函数
import throttle from '@/utils/throttle.js'
export default {
  data() {
    return {
      isFixed: false,
      sbOffsetTop: 0,
      isActive: true
    }
  },
  mounted() {
    // 获取 侧边栏到顶部的偏移量 上边框相对于父元素上边框的距离
    this.sbOffsetTop = this.$refs.sidebar.offsetTop
    window.addEventListener('scroll', this.handleScroll) // 监听滚动事件，然后用handleScroll这个方法进行相应的处理
  },
  methods: {
    // 滚动触发
    handleScroll: throttle(function () {
      // 页面滚动过的距离
      const wScrollTop = window.scrollY
      // console.log(wScrollTop)
      if (wScrollTop > this.sbOffsetTop) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    }, 100),
    // 回到顶部
    goTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.side-bar {
  position: absolute;
  top: 662px;
  left: 50%;
  margin-left: 610px;
  width: 58px;
  height: 348px;
  background-color: #f0f0f0;
  // transition: position 1s linear;
  ul {
    width: 58px;
    height: 348px;
    li {
      width: 58px;
      height: 58px;
      a {
        display: block;
        width: 38px;
        height: 38px;
        font-size: 14px;
        padding: 10px;
        line-height: 19px;
        text-align: center;
        .line {
          position: relative;
          top: 9px;
          display: block;
          height: 0;
          width: 0;
          border-left: 19px solid transparent;
          border-right: 19px solid transparent;
          border-bottom: 1px solid #ccc;
        }
        .cur {
          top: 6px;
        }
        .iconfont {
          font-size: 25px;
        }
        .active {
          color: #e6473f;
        }
        &:hover {
          background-color: #ccc;
        }
      }
    }
  }
}
// 一定要放在 .side-bar 的后面，因为要在符合条件时层叠掉它
.is_fixed {
  position: fixed;
  top: 80px;
}
</style>
