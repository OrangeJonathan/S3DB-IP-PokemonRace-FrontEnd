<template>
    <ul>
      <li>
        <a
          class="nav-link"
          href="#home"
          @click="selectTab('home')"
          :class="{ active: selectedTab === 'home' }"
        >
          Home
        </a>
      </li>
      <li>
        <a
          class="nav-link"
          href="#race"
          @click="selectTab('race')"
          :class="{ active: selectedTab === 'race' }"
        >
          Race
        </a>
      </li>
      <li>
        <a
          class="nav-link"
          href="#practice"
          @click="selectTab('practice')"
          :class="{ active: selectedTab === 'practice' }"
        >
          Practice
        </a>
      </li>
      <li>
        <a
          class="nav-link"
          href="#friends"
          @click="selectTab('friends')"
          :class="{ active: selectedTab === 'friends' }"
        >
          Friends
        </a>
      </li>
    </ul>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedTab: '', // Store the selected tab
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
  