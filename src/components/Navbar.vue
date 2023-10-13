<template>
  <ul>
    <li>
      <router-link to="/home" class="nav-link" @click="selectTab('home')" :class="{ active: selectedTab === 'home' }">
        Home
      </router-link>
    </li>
    <li>
      <router-link to="/race" class="nav-link" @click="selectTab('race')" :class="{ active: selectedTab === 'race' }">
        Race
      </router-link>
    </li>
    <li>
      <router-link to="/practice" class="nav-link" @click="selectTab('practice')" :class="{ active: selectedTab === 'practice' }">
        Practice
      </router-link>
    </li>
    <li>
      <router-link to="/friends" class="nav-link" @click="selectTab('friends')" :class="{ active: selectedTab === 'friends' }">
        Friends
      </router-link>
    </li>
  </ul>
</template>


  
<script>
export default {
  data() {
    return {
      selectedTab: '',
    };
  },
  methods: {
    selectTab(tabName) {
      this.selectedTab = tabName;
    },
  },
};
</script>
  
<style scoped>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
  }
  
  li {
    float: left;
    color: white;
  }
  
  .nav-link {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }
  
  .nav-link:hover:not(.active) {
    background-color: #111;
  }
  
  .active {
    background-color: #b97004;
  }
  </style>
  