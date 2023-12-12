<template>
  <div class="flex">
    <!-- Left Column: FriendList -->
    <FriendList @open-details="handleDetails" class="w-1/3 p-4" />

    <!-- Middle Column: FriendDetails -->
    <FriendDetails v-if="chatEnabled" :selectedFriend="selectedFriend" class="w-1/3" />

    <!-- Right Column: Chat -->
    <chat v-if="chatEnabled" :selectedFriend="selectedFriend" class="w-1/3" />
  </div>
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