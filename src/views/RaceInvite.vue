<template>
    <div class="flex" v-if="!started">
        <FriendList class="flex-1" ref="friendList" @open-details="handleGameCreation" :friendRequestEnabled="false" :friendListHeaderText="'Invite a Friend'"/>
        <RaceInvitation class="flex-1" @raceAccepted="raceAccepted"/>
        <Modal :open="modalIsOpen" :additionalButtonName="'Invite'" @close="closeModal" @additional-button="inviteToRace()">
            <h1 class="text-2xl font-bold mb-4">Invite {{ selectedFriend.username }}</h1>
            <div class="flex">
                <div class="w-1/2">
                    <GenerationSelector @selected-generation="setSelectedGeneration"/>
                </div>
                <div class="w-1/2">
                    <TimeSelector @selected-time="setSelectedTime"/>
                </div>
            </div>
        </Modal>
    </div>
    <div v-else>
        <Racing :generation="selectedGeneration" :timeSeconds="selectedTime" />
    </div>
</template>


<script>
import FriendList from "@/components/FriendList.vue";
import Modal from "@/components/modal/modal.vue";
import GenerationSelector from '@/components/GenerationSelector.vue';
import TimeSelector from '@/components/TimeSelector.vue';
import RaceInvitation from '@/components/RaceInvitation.vue';
import RaceRepository from '@/repository/raceRepository.js';
import authService from '@/service/authService.js';
import Racing from '@/components/Racing.vue';
import Guess from "@/components/Guess.vue";


const raceRepo = new RaceRepository();

export default {
    name: "Race",
    components: {
        Guess,
        FriendList,
        Modal,
        GenerationSelector,
        TimeSelector,
        RaceInvitation,
        Racing
    },
    setup() {
        const { user, isAuthenticated } = authService();

        return { user, isAuthenticated };
    },
    data() {
        return {
            invitationEnabled: false,
            selectedFriend: '',
            modalIsOpen: false,
            selectedTime: 60,
            selectedGeneration: 0,
            currentScore: 0,
            started: false,
            timerActive: false,
        }
    },
    methods: {
        handleGameCreation(value) {
            this.modalIsOpen = true;
            this.selectedFriend = value;
        },
        closeModal() {
            this.modalIsOpen = false;
            this.$refs.friendList.resetSelectedUser();
        },
        setSelectedTime(value) {
            console.log(value);
            this.selectedTime = value;
        },
        setSelectedGeneration(value) {
            console.log(value);
            this.selectedGeneration = value;
        },
        async inviteToRace() {
            const token = await this.$auth0.getAccessTokenSilently();
            const player1Auth0Id = this.user.sub;
            console.log(this.player1Auth0Id)
            await raceRepo.createRace(player1Auth0Id, this.selectedFriend.auth0Id, this.selectedGeneration, this.selectedTime, token); 
            this.modalIsOpen = false;
            this.started = true;
        },
        raceAccepted() {
            this.started = true;
        },
        activateTimer() {
        this.timerActive = true;
        },
        handleScore(value) {
        this.currentScore = value;
        },
    }
  }
</script>