<template>
  <div class="appContainer">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  components: {
    Header,
    Footer
  },
  created() {
    this.$store.dispatch('home/getBannerList')
    this.$store.dispatch('home/getFloorsList')
  }
}
</script>

<style></style>
