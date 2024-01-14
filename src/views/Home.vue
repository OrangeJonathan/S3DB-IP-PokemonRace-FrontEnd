<template>
  <div>
    <LandingPage v-if="!isAuthenticated" />
    <LandingLoggedIn v-if="isAuthenticated" />
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import LandingPage from "@/components/LandingPage.vue";
import LandingLoggedIn from "@/components/LandingLoggedIn.vue";
import authService from '@/service/authService.js';

export default {
  name: "Home",
  components: {
    HelloWorld,
    LandingPage,
    LandingLoggedIn,
  },
  setup()
  {
    const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = authService();

    return { user, isAuthenticated, isLoading, loginWithRedirect, logout};
  },
  
};
</script>

<style>
@import '/src/assets/main.css';
</style>