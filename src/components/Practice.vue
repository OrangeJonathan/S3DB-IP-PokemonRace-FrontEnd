<template>
  <div class="container">
    <div class="info">
      <p class="score">Correctly Guessed: {{ score }}</p>
      <p class="timer">Time Remaining: {{ timerCount }}</p>
    </div>
    <button class="btn-start" :disabled="btnIsDisabled" @click="startTimer">Start</button>
    <br>
    <img class="center" :src="pokemonArt">
    <br>
    <input ref="pokemonInput" class="center" :disabled="inputIsDisabled" type="text" v-model="chosenPokemon" @input="checkIfCorrect">
    <button class="btn-skip center" :disabled="inputIsDisabled" @click="skipPokemon">Skip</button>
  </div>
</template>

  
<script>
import { handleError } from 'vue';
import axios from 'axios';

  export default {
    data() {
      return {
        chosenPokemon: "",
        score: 0,
        pokemonName: "",
        pokemonId: "",
        pokemonArt: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png",

        btnIsDisabled: false,
        inputIsDisabled: true,

        timerEnabled: false,
        timerCount: 60,
      };
    },
    
    watch: {

        timerEnabled(value) {
            if (value) {
                setTimeout(() => {
                    this.timerCount--;
                }, 1000);
            }
        },

        timerCount: {
            handler(value) {

                if (value > 0 && this.timerEnabled) {
                    setTimeout(() => {
                        this.timerCount--;
                    }, 1000);
                }
                else if (value == 0)
                {
                    this.btnIsDisabled = false;
                    this.inputIsDisabled = true;
                    this.chosenPokemon = '';

                }

            },
            immediate: true
            }

        },

    methods: {
      fetchPokemon() {
        fetch('/api/guess/pokemon')
          .then(response => {
            return response.json();
          })
          .then(data => {
            this.pokemonId = data.id;
            this.pokemonName = data.name;
            this.pokemonArt = data.imageString;
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      },
      checkIfCorrect(){
        fetch('/api/guess/pokemon/' + this.chosenPokemon.toLowerCase())
        .then(response => {
            return response.json();
        })
        .then(apiResponse => {
        if (apiResponse === true) {
            console.log('You guessed correctly!');
            this.chosenPokemon = '';
            this.fetchPokemon();
            this.score++;
        } 
            })
      },
      skipPokemon(){
         this.chosenPokemon = '';
         this.focusInput();
         this.fetchPokemon();
        },
      startTimer(){
        this.timerCount = 60;
        this.score = 0;
        this.chosenPokemon = '';
        this.btnIsDisabled = true;
        this.inputIsDisabled = false;
        this.fetchPokemon();
        this.focusInput();
        this.resetGuessedPokemon();
        this.timerEnabled = true;
        
      },
      resetGuessedPokemon(){
        axios
        .post('/api/guess/pokemon/reset')
        .catch((error) =>
        {
          console.error("Failed to reset pokemon", error);
        })
      },

      focusInput() {
        this.$nextTick(() => {
        this.$refs.pokemonInput.focus();
        });
      },

    },
  };
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.info {
    display: flex;
    justify-content: space-between;
    width: 50%;
    margin: 0 auto;
}

.timer, .score {
    font-size: 20px;
}

.btn-start {
    margin-top: 10px;
    padding: 5px 20px;
}

.center {
    display: block;
    margin: 0 auto;
}

.btn-skip {
    padding: 5px 20px;
}
</style>