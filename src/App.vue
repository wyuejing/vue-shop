<template>
  <div class="appContainer">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header/index.vue'
import Footer from '@/components/Footer/index.vue'
export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style></style>
