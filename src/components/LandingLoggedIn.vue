<template>
  <div>
    <Navbar class="fixed top-0 left-0 right-0 z-50" />
    <section class="w-full h-screen bg-black flex flex-col items-center justify-start text-white relative pt-20">
      <div class="absolute inset-0 bg-white opacity-10"></div>
      <h1 class="text-5xl font-bold animate-fadeIn z-10">Hello {{ user.name }}</h1>
      <div class="flex">
        <router-link
          class="inline-flex ml-5 mr-5 h-10 animate-fadeIn items-center justify-center rounded-md bg-green-600 px-8 text-sm font-medium text-gray-50 shadow hover:bg-green-700 focus-visible:outline-none mt-10 z-10"
          :class="$route.name == 'practice'? 'active':''" aria-current="page" :to="{ name: 'practice'}">
          Practice
        </router-link>
        <router-link
          class="inline-flex ml-5 mr-5 h-10 animate-fadeIn items-center justify-center rounded-md bg-green-600 px-8 text-sm font-medium text-gray-50 shadow hover:bg-green-700 focus-visible:outline-none mt-10 z-10"
          :class="$route.name == 'race'? 'active':''" aria-current="page" :to="{ name: 'race'}">
          Race
        </router-link>
        <router-link
          class="inline-flex ml-5 mr-5 h-10 animate-fadeIn items-center justify-center rounded-md bg-green-600 px-8 text-sm font-medium text-gray-50 shadow hover:bg-green-700 focus-visible:outline-none mt-10 z-10"
          :class="$route.name == 'friends'? 'active':''" aria-current="page" :to="{ name: 'friends'}">
          Friends
        </router-link>
      </div>
    </section>
    <Footer />
  </div>
</template>

  
<script>
import authService from '@/service/authService.js';
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'


export default {
  components: {
      Navbar,
      Footer,
    },
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
  
<style scoped>
  .animate-fadeIn {
    animation: fadeIn ease 2s;
    -webkit-animation: fadeIn ease 2s;
    -moz-animation: fadeIn ease 2s;
    -o-animation: fadeIn ease 2s;
    -ms-animation: fadeIn ease 2s;
  }

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @-moz-keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @-webkit-keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @-o-keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @-ms-keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
</style>