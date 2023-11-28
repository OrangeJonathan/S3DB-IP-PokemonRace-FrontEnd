<template>
  <ul class="nav-ul">
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
      <button class ="nav-link" @click.prevent="login">
        log in
      </button>
    </li>
    <li class="nav-li log-in-out" v-if="isAuthenticated">
      <button class ="nav-link " @click.prevent="logout">
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
import { useAuth0 } from '@auth0/auth0-vue';
export default {
  name: "NavBar",
  setup() {
    const auth0 = useAuth0();

    return {
      isAuthenticated: auth0.isAuthenticated,
      isLoading: auth0.isLoading,
      user: auth0.user,
      login() {
        auth0.loginWithRedirect();
      },
      logout() {
        auth0.logout({
          logoutParams: {
            returnTo: window.location.origin
          }
        });
      }
    }
  }
}


</script>

<style>
  @import '/src/assets/navbar.css';
</style>
