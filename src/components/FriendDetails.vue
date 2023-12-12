<template>
    <div class="flex flex-col items-center space-y-2">
        <button class="bg-gradient-to-r from-blue-200 to-blue-400 px-4 py-2 rounded-full shadow-md hover:shadow-lg">
            Invite {{ selectedFriend.username }} for Race
        </button>
        <button class="bg-gradient-to-r from-red-400 to-red-600 px-4 py-2 rounded-full shadow-md hover:shadow-lg" @click="removeFriend()">
            Remove {{ selectedFriend.username }} as Friend
        </button>
    </div>
</template>





<script>
import authService from '@/service/authService.js';
import FriendRepository from '../repository/friendRepository.js';
const friendRepo = new FriendRepository();

export default {
    setup() {
        const { user, isAuthenticated } = authService();

        return { user, isAuthenticated };
    },
    props: {
        selectedFriend: '',
    },
    methods: {
        async removeFriend() {
            const token = await this.$auth0.getAccessTokenSilently();
            const auth0Id = this.user.sub;

            await friendRepo.removeFriend(token, auth0Id, this.selectedFriend)
            this.$router.go();

        },
    },
}

</script>