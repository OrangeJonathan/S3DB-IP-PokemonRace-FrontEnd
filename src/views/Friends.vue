<template>
  <FriendList @open-details="handleDetails" class="fixed"/>
  <chat v-if="chatEnabled" :selectedFriend="selectedFriend" class="fixed right-0" />
</template>

<script>
import Chat from "@/components/Chat.vue";
import FriendList from "@/components/FriendList.vue";	
import FriendDetails from "@/components/FriendDetails.vue"

export default {
  name: "Friends",
  components: {
    Chat,
    FriendList,
    FriendDetails,
  },
  data () {
    return {
      chatEnabled: false,
      selectedFriend: '',
    }
  },
  methods: {
    handleDetails(value) {
      this.selectedFriend = value;
      this.chatEnabled = true;
    }
  },
};
</script>

<style>
</style>