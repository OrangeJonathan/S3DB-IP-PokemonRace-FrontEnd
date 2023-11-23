<template>
  <footer>
    <p class="footer-text">© Jonathan Kat - 2023</p>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style scoped>
footer {
  background-color: #333;
  text-align: left;
  position: fixed;
  bottom:0;
  padding-left: 10px;
  width: 100%;
}

.footer-text {
  color: white;
}

</style>
