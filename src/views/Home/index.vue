<template>
  <div class="home">
    <type-nav></type-nav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor></Floor>
    <Floor></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
// 引入组件
import ListContainer from '@/views/Home/ListContainer'
import Recommend from '@/views/Home/Recommend'
import Rank from '@/views/Home/Rank'
import Like from '@/views/Home/Like'
import Floor from '@/views/Home/Floor'
import Brand from '@/views/Home/Brand'

import { mapState } from 'vuex'
export default {
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  created() {
    this.$store.dispatch('home/getBannerList')
    this.$store.dispatch('home/getFloorsList')
  },
  computed: {
    ...mapState({
      bannerList: (state) => state.home.bannerList,
      floorsList: (state) => state.home.floorsList
    })
  }
}
</script>

<style></style>
