<template>
    <FriendList :friendRequestEnabled="false" :friendListHeaderText="'Invite a Friend'"/>
</template>

<script>
import FriendList from "@/components/FriendList.vue";


export default {
    name: "Race",
    components: {
        FriendList,
    },
  }
</script>