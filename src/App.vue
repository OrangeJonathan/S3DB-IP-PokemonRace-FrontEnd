<template>
  <Navbar/>
  <router-view></router-view>
</template>


<script >
  import HelloWorld from './components/HelloWorld.vue'
  import Navbar from './components/Navbar.vue'
  import Practice from './components/Practice.vue'
  import Friends from './components/Friends.vue'

  export default {
    name: 'App',
    components: {
      HelloWorld,
      Navbar,
      Practice,
      Friends,
    }
  }
</script>

