<template>
    <div>
        <div v-if="countdown == 4">
            Waiting for opponent to accept your invitation...
        </div>
      <div v-else-if="countdown > 0">
        <h2>Game starts in: {{ countdown }}</h2>
      </div>
      <div v-else-if="!gameStarted && countdown == 0">
        <h2>The winner is {{ currentWinner }}</h2>
      </div>
      <div v-else>
        <div class="flex items-center justify-center content-center space-x-10">
        <p class="bg-color-333 px-5 py-2 rounded-b-lg text-white text-center">
          Time Left:
          <Timer ref="timerComp" :timerActive="gameStarted" :startTime="timeSeconds" @timerEnded="handleTimer" />
        </p>
        <p class="bg-color-333 px-5 py-2 rounded-b-lg text-white text-center">
          Score:
          <CurrentScore :currentScore="currentScore" />
        </p>
        </div>
        <div class="flex justify-center">
            <Guess ref="guessComp" :isRace="true" :startVisible="false" :timerActive="gameStarted" :generation="generation" @score="handleScore"/>
        </div>
      </div>
      
    </div>
  </template>
  
  <script>
  import SockJS from 'sockjs-client';
  import Stomp from 'stompjs';
  import Guess from '@/components/Guess.vue'
  import CurrentScore from "@/components/CurrentScore.vue";
  import Timer from "@/components/Timer.vue";
  import axios from 'axios';
  import authService from '@/service/authService.js';

  
  export default {
    name: 'Game',
    components: {
      CurrentScore,
      Guess,
      Timer,
    },
    props: {
      generation: {
        type: Number,
        default: 0,
      },
      timeSeconds: {
        type: Number,
        default: 60,
      },
    },
    setup() {
        const { user, isAuthenticated } = authService();

        return { user, isAuthenticated };
    },
    data() {
      return {
        stompClient: null,
        countdown: 4,
        gameStarted: false,
        currentScore: 0,
        currentWinner: '',
      };
    },
    watch: {
    gameStarted(newVal) {
        if (newVal) {
        this.$nextTick(() => {
            this.$refs.guessComp.startTimer();
            this.$refs.timerComp.startTimer();
        });
        }
    },
    },
    created() {
    const socket = new SockJS('http://localhost:8080/websocket');
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, () => {
        this.stompClient.subscribe('/topic/countdown', (countdown) => {
        this.countdown = countdown.body;
        });

        this.stompClient.subscribe('/topic/start', (start) => {
        this.currentScore = 0;
        console.log('Game started!');
        this.gameStarted = true;
        });

        // Subscribe to the /topic/winner topic
        this.stompClient.subscribe('/topic/winner', (winner) => {
        console.log('The winner is:', winner.body);
        this.currentWinner = winner.body;
        });
    });
    },
    beforeDestroy() {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
    },
    methods: {
        async handleScore(value) {
        this.currentScore = value;
        const auth0Id = this.user.sub;
        const token = await this.$auth0.getAccessTokenSilently();
        console.log(auth0Id);

        // Submit the score to the server
        axios.post('/api/race/submitScore', null, {
            params: {
        auth0Id: auth0Id, 
        score: this.currentScore,
        },
        headers: {
        Authorization: `Bearer ${token}`,
        }
    })
        .then(response => {
        console.log('Score submitted successfully:', response);
        })
        .catch(error => {
        console.error('Error submitting score:', error);
        });
    },
        handleTimer(value) {
            this.gameStarted = false;
        },
        },
  };
  </script>
  
  <style scoped>
  /* Add your CSS styles here */
  </style>