<template>
  <Navbar/>
  <Guess/>
</template>


<script >
  import HelloWorld from './components/HelloWorld.vue'
  import Navbar from './components/Navbar.vue'
  import Guess from './components/Guess.vue'
  import Friends from './components/Friends.vue'

  export default {
    name: 'App',
    components: {
      HelloWorld,
      Navbar,
      Guess,
      Friends,
    }
  }
</script>

