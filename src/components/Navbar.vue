<template>
  <ul class="nav-ul" ref="navbar">
    <li class="nav-li">
      <router-link class="nav-link" :class="$route.name == 'home'? 'active':''" aria-current="page" :to="{ name: 'home'}">
        Home
      </router-link>
    </li>
    <li class="nav-li">
      <router-link class="nav-link" :class="$route.name == 'practice'? 'active':''" aria-current="page" :to="{ name: 'practice'}">
        Practice
      </router-link>
    </li>
    <li class="nav-li" v-if="isAuthenticated">
      <router-link class="nav-link" :class="$route.name == 'race'? 'active':''" aria-current="page" :to="{ name: 'race'}">
        Race
      </router-link>
    </li>
    <li class="nav-li" v-if="isAuthenticated">
      <router-link class="nav-link" :class="$route.name == 'friends'? 'active':''" aria-current="page" :to="{ name: 'friends'}">
        Friends
      </router-link>
    </li>
    <li class="nav-li log-in-out" v-if="!isAuthenticated && !isLoading">
      <button class ="nav-link" @click.prevent="handleLogin">
        log in
      </button>
    </li>
    <li class="nav-li log-in-out" v-if="isAuthenticated">
      <button class ="nav-link " @click.prevent="handleLogout">
        log out
      </button>
    </li>
    <li class="nav-li log-in-out" v-if="isAuthenticated">
      <button class ="nav-link">
        {{ user.name }}
      </button>
    </li>
    <li class="nav-li log-in-out" v-if="isAuthenticated">
      <img class="pofile-picture" :src="user.picture" width="52" length="52">
    </li>
  </ul>
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
  },
  mounted() {
    this.$emit('navbarHeight', this.$refs.navbar.clientHeight);
  },
  
};


</script>

<style>
  @import '/src/assets/navbar.css';
</style>
