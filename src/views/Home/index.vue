<template>
  <div class="home">
    <type-nav></type-nav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor :floor="floor" v-for="floor in floorsList" :key="floor.id"></Floor>
    <Brand></Brand>
    <SideBar></SideBar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {
    ListContainer: () => import('@/views/Home/ListContainer'),
    Recommend: () => import('@/views/Home/Recommend'),
    Rank: () => import('@/views/Home/Rank'),
    Like: () => import('@/views/Home/Like'),
    Floor: () => import('@/views/Home/Floor'),
    Brand: () => import('@/views/Home/Brand'),
    SideBar: () => import('@/views/Home/SideBar')
  },
  computed: {
    ...mapState({
      floorsList: (state) => state.home.floorsList
    })
  }
}
</script>

<style></style>
