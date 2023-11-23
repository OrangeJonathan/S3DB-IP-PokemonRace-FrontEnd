<template>
  <ul class="nav-ul">
    <li class="nav-li">
      <router-link class="nav-link" :class="$route.name == 'home'? 'active':''" aria-current="page" :to="{ name: 'home'}">
        Home
      </router-link>
    </li>
    <li class="nav-li">
      <router-link class="nav-link" :class="$route.name == 'race'? 'active':''" aria-current="page" :to="{ name: 'race'}">
        Race
      </router-link>
    </li>
    <li class="nav-li">
      <router-link class="nav-link" :class="$route.name == 'practice'? 'active':''" aria-current="page" :to="{ name: 'practice'}">
        Practice
      </router-link>
    </li>
    <li class="nav-li">
      <router-link class="nav-link" :class="$route.name == 'friends'? 'active':''" aria-current="page" :to="{ name: 'friends'}">
        Friends
      </router-link>
    </li>
  </ul>
</template>

<script>
</script>

<style>
  @import '/src/assets/navbar.css';
</style>
