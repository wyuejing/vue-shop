<template>
  <div class="side-bar" ref="sidebar" :style="styleObject">
    <ul>
      <li>
        <a href="javascript:void(0);">
          <span class="active">今日推荐</span>
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
          <span class="line"></span>
        </a>
      </li>
      <li>
        <a href="javascript:void(0);">
          <span class="iconfont icon-fanhuidingbu"></span>
          <span>顶部</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      styleObject: {
        position: 'position',
        top: 662 + 'px'
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll) // 监听滚动事件，然后用handleScroll这个方法进行相应的处理
  },
  methods: {
    handleScroll() {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop // 滚动条偏移量
      const offsetTop = this.$refs.sidebar.offsetTop // 要滚动到顶部吸附的元素的偏移量
      console.log(scrollTop, offsetTop - 100)
      if (scrollTop > offsetTop - 100) {
        this.styleObject = {
          position: 'fixed',
          top: 200 + 'px'
        }
      } else if (scrollTop < offsetTop - 100) {
        this.styleObject = {
          position: 'position',
          top: 662 + 'px'
        }
      }
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
          top: 8px;
          display: block;
          height: 1px;
          border-bottom: 1px solid #ccc;
        }
        .iconfont {
          font-size: 25px;
        }
        .active {
          color: #e6473f;
        }
      }
    }
  }
}
.is_fixed {
  position: fixed;
  top: 200px;
}
</style>
