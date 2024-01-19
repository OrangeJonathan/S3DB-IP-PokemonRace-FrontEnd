<template>
    <div class="invitation-list">
      <h2 class="text-2xl font-bold mb-4 text-center">Incoming Invitations</h2>
      <ul>
        <p class="light-border mb-2" />
        <li v-for="race in pendingRaces" class="mb-2 bg-blue-200" :key="race.id">
          {{ race.player1.username }}
          <button
            class="px-4 py-2 rounded-full shadow-md hover:shadow-lg bg-gradient-to-r from-green-500 to-green-300"
            @click="acceptInvite"
            >
            Accept
          </button>
        </li>
      </ul>
    </div>
  </template>


<script>
import authService from '@/service/authService.js';
import RaceRepository from '@/repository/raceRepository';
const raceRepo = new RaceRepository();

export default {
    setup() {
        const { user, isAuthenticated } = authService();

        return { user, isAuthenticated };
    },
    data() {
        return {
            pendingRaces: [],
        };
    },
    mounted() {
        this.fetchPendingInvites();

    },
    methods: {
        async fetchPendingInvites() {
            const token = await this.$auth0.getAccessTokenSilently();
            const auth0Id = this.user.sub;

            await raceRepo.getPendingRaces(auth0Id, token);
            this.pendingRaces = raceRepo.pendingRaces;
            console.log(this.pendingRaces);

        },
        async acceptInvite(friend) {
            const token = await this.$auth0.getAccessTokenSilently();
            const auth0Id = this.user.sub;
            this.$emit('raceAccepted', true);
            await raceRepo.acceptRace(auth0Id, token);
        },
    },
};
</script>

<style scoped>
.invitation-list {
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
.invitation-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.invitation-list button {
    flex-shrink: 0;
}
</style>
