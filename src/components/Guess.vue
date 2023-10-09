<template>
    <div>
      <button :disabled='btnIsDisabled' @click="startTimer">Start</button>
      {{ score }}
        <br>
        {{ timerCount }}
      <br>
      <img :src="pokemonArt">
      <br>
      <input :disabled="inputIsDisabled" type="text" v-model="chosenPokemon" @input="checkIfCorrect">
      <br>
      <button :disabled="inputIsDisabled" @click="skipPokemon">Skip</button>
    </div>
  </template>
  
  <script>
import { handleError } from 'vue';

  export default {
    data() {
      return {
        chosenPokemon: "",
        score: 0,
        pokemonName: "",
        pokemonId: "",
        pokemonArt: "",

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
         this.fetchPokemon();
        },
      startTimer(){
        this.timerCount = 60;
        this.score = 0;
        this.chosenPokemon = '';
        this.btnIsDisabled = true;
        this.inputIsDisabled = false;
        this.fetchPokemon();
        this.timerEnabled = true;
      },
    },
  };
  </script>