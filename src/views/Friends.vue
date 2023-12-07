<template>
  <FriendList />
  <chat />
</template>

<script>
import Chat from "@/components/Chat.vue";
import FriendList from "@/components/FriendList.vue";	

export default {
  name: "Friends",
  components: {
    Chat,
    FriendList,
  }
};
</script>