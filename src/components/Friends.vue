<template>
    <ul>
        <li v-for="friend in friends" @click="showFriend(friend)">{{ friend.id }}</li>
    </ul>

    <div class="details" v-show="showDetails">
      <h2>Friend Details</h2>
      <p>
        <a>
          {{ selectedFriend.id}} - {{ selectedFriend.name }}
        </a>
      </p>
    </div>
</template>

<style>
    li:hover{
        color: orange;
    }
</style>


<script>
export default {
  name: "Friend",
  data(){
    return {
      friends: [],
      showDetails: false,
      selectedFriend: "",
    }
  },

  methods: {
    showFriend(friend) {
        this.selectedFriend = friend;
        this.showDetails = true;
    }
  },
  mounted() {
    fetch("/api/friends")
    .then( response => {
        return response.json();
    })
    .then(friends => {
        this.friends = friends
    })
  }
}
</script>