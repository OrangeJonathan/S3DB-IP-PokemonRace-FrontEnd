<template>
    <section class="w-full h-screen bg-black flex flex-col items-center justify-start text-white relative pt-20">
      <div class="absolute inset-0 bg-white opacity-10"></div>
      <h2 className="text-sm font-medium z-10">Welcome to</h2>
      <h1 class="text-5xl font-bold z-10">PokeRacer</h1>
      <button
        class="inline-flex h-10 items-center justify-center rounded-md bg-green-600 px-8 text-sm font-medium text-gray-50 shadow hover:bg-green-700 focus-visible:outline-none mt-10 z-10"
        @click.prevent="handleLogin">
        Log In to Play
      </button>
    </section>
</template>
  
<script>
import authService from '@/service/authService.js';

export default {
  setup()
  {
    const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = authService();

    return { user, isAuthenticated, isLoading, loginWithRedirect, logout};
  },
  methods: {
    async handleLogin() {
      await this.loginWithRedirect();
    },
    handleLogout() {
      this.logout();
    },
  }
}
</script>
  