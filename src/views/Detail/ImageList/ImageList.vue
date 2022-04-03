<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(item, index) in skuImageList"
        :key="item.id"
        @click="setCurrentIndex(index)"
      >
        <img :src="item.imgUrl" :class="{ active: currentIndex === index }" />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'ImageList',
  data() {
    return {
      // 选中的图片编号
      currentIndex: 0
    }
  },
  methods: {
    setCurrentIndex(index) {
      // 点击后设置
      this.currentIndex = index
      // 将index传给兄弟组件
      this.$bus.$emit('setIndex', index)
    }
  },
  props: ['skuInfo'],
  computed: {
    skuImageList() {
      return this.skuInfo.skuImageList || []
    }
  },
  watch: {
    skuInfo() {
      this.$nextTick(() => {
        const mySwiper = new Swiper(this.$refs.mySwiper, {
          navigation: {
            // 如果需要前进后退按钮
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          // 同时显示的slides数量
          slidesPerView: 4,
          // 在carousel mode下定义slides的数量多少为一组。
          slidesPerGroup: 2
        })
        return mySwiper
      })
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 402px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
