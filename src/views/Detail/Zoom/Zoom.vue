<template>
  <div class="spec-preview" @mousemove="setPlace">
    <img :src="skuImageList[currentIndex].imgUrl" />
    <div class="event"></div>
    <div class="big">
      <img :src="skuImageList[currentIndex].imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
import throttle from '@/utils/throttle.js'
export default {
  name: 'Zoom',
  props: ['skuInfo'],
  data() {
    return {
      // 选中的图片编号
      currentIndex: 0
    }
  },
  computed: {
    skuImageList() {
      // 如果这个属性存在
      if (this.skuInfo.skuImageList) {
        const len = this.skuInfo.skuImageList.length
        // 但是为空数组
        if (len === 0) {
          return [{}]
        } else {
          // 不为空
          return this.skuInfo.skuImageList
        }
      }
      // 属性不存在
      return [{}]
    }
  },
  mounted() {
    this.$bus.$on('setIndex', (index) => {
      this.currentIndex = index
    })
  },
  methods: {
    setPlace: throttle(function (e) {
      const mask = this.$refs.mask
      let maskLeft = e.offsetX - mask.offsetWidth / 2
      let maskTop = e.offsetY - mask.offsetHeight / 2
      if (maskLeft < 0) maskLeft = 0
      if (maskLeft > mask.offsetWidth) maskLeft = mask.offsetWidth
      if (maskTop < 0) maskTop = 0
      if (maskTop > mask.offsetHeight) maskTop = mask.offsetHeight
      mask.style.top = maskTop + 'px'
      mask.style.left = maskLeft + 'px'
      const big = this.$refs.big
      big.style.top = -2 * maskTop + 'px'
      big.style.left = -2 * maskLeft + 'px'
    }, 100)
  }
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
