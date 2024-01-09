<template>
    <div class="friend-list">
        <h2 class="text-2xl font-bold mb-4 text-center ">{{ friendListHeaderText }}</h2>
        <ul>
            <li class="" v-if="friendRequestEnabled">
                <input type="text" placeholder="enter e-mail" v-model="chosenEmail" >
                <button @click="sendFriendRequest()" class="bg-gradient-to-r from-blue-200 to-blue-400 px-4 py-2 rounded-full shadow-md hover:shadow-lg">
                    Send Request
                </button>
            </li>
            <li v-if="friendRequestEnabled" v-for="friend in pendingFriends" :key="friend.id" class="mb-2 bg-blue-200">
                {{ friend.username }}
                <button @click="acceptFriend(friend)" class="px-4 py-2 rounded-full shadow-md hover:shadow-lg bg-gradient-to-r from-green-500 to-green-300">
                    Accept
                </button>
            </li>
            <p class="light-border mb-2" />
            <li v-for="friend in friends" :key="friend.id" class="mb-2" :class="{ ' bg-zinc-200': friend !== selectedUser, 'bg-green-300': friend === selectedUser }">
                {{ friend.username }}
                <button 
                @click="openDetails(friend)" 
                class="px-4 py-2 rounded-full shadow-md hover:shadow-lg" 
                :class="{ 'bg-gradient-to-r from-blue-200 to-blue-400': friend !== selectedUser, 'bg-gradient-to-r from-green-500 to-green-300': friend === selectedUser }">
                    <span v-if="friendListHeaderText=='Friend List'"> Select </span>
                    <span v-if="friendListHeaderText=='Invite a Friend'"> Invite </span>
                </button>
            </li>
        </ul>
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
        friendRequestEnabled: Boolean,
        friendListHeaderText: String,
    },
    data() {
        return {
            friends: [],
            pendingFriends: [],
            chosenEmail: '',
            selectedUser: null,   
        };
    },
    mounted() {
        this.fetchAcceptedFriends();
        this.fetchPendingFriends();

    },
    methods: {
        async fetchAcceptedFriends() {
            const token = await this.$auth0.getAccessTokenSilently();
            const auth0Id = this.user.sub;

            await friendRepo.fetchAcceptedFriends(token, auth0Id)
            this.friends = friendRepo.friends;

        },
        async fetchPendingFriends() {
            const token = await this.$auth0.getAccessTokenSilently();
            const auth0Id = this.user.sub;

            await friendRepo.fetchPendingFriends(token, auth0Id);
            this.pendingFriends = friendRepo.pendingFriends;
        },
        openDetails(friend) {
            this.selectedUser = friend;
            this.$emit('open-details', friend);
        },
        async sendFriendRequest() {
            const token = await this.$auth0.getAccessTokenSilently();
            const auth0Id = this.user.sub;
            const email = this.chosenEmail;
            await friendRepo.sendFriendRequest(token, auth0Id, email);
            this.chosenEmail = '';
        },
        async acceptFriend(friend) {
            const token = await this.$auth0.getAccessTokenSilently();
            const auth0Id = this.user.sub;
            await friendRepo.acceptFriendRequest(token, auth0Id, friend);
            this.fetchAcceptedFriends();
            this.fetchPendingFriends();

        }
    },
};
</script>

<style scoped>
.friend-list {
    max-width: 400px;
    margin: 0;
    padding: 20px;
    border-right: 1px solid #ddd; 
    border-bottom: 1px solid #ddd; 
    overflow-y: auto; 
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    padding: 10px;
    border-radius: 7px;
}

.light-border {
    border-bottom: 1px solid #ddd;
}

.rounded-sm {
    border-radius: 0.25rem;
}

.bg-light-blue-200 {
    background-color: #BFDBFE;
}

.px-3 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
}

.py-1 {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
}

.mt-2 {
    margin-top: 0.5rem;
}

/* Added styles for chat */
.friend-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.friend-list button {
    flex-shrink: 0;
}
</style>
