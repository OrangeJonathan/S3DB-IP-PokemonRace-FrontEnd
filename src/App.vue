<template>
  <Navbar v-if="!['home'].includes($route.name)" />
  <router-view class=""/>
  <Footer v-if="!['home'].includes($route.name)" />
</template>


<script >
  import Navbar from './components/Navbar.vue'
  import Footer from './components/Footer.vue'

  export default {
    name: 'App',
    components: {
      Navbar,
      Footer,
    }
  }
</script>

