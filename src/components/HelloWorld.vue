<template>
  <h1 class="centered-message-hello-world">{{ msg }}</h1>
</template>

<script>

export default {
  name: "HelloWorld",
  data(){
    return {
      msg: ""
    }
  },
  mounted() {
    fetch("/api/messages/hello")
    .then( response => response.text())
    .then( data => {
      this.msg = data;
    })
    
  }
}
</script>

<style scoped>
  .centered-message-hello-world {
    text-align: center;
  }
</style>
