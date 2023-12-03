<template>
  <div class="inline-block">
    <div class="image">
      <img class="center" :src="pokemonArt" alt="Pokémon">
    </div>
    <p class="flex">
      <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 center border border-gray-400 rounded shadow" :disabled="btnIsDisabled" @click="startTimer">Start</button>
    </p>
    <br>
    <input ref="pokemonInput" class="center" :disabled="inputIsDisabled" type="text" v-model="chosenPokemon" @input="checkIfCorrect">
    <p class="">
      <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 center border border-gray-400 rounded shadow" :disabled="inputIsDisabled" @click="skipPokemon">Skip</button>
    </p>
  </div>
</template>

<script>
import axios from 'axios';
import PokemonRepository from '../repository/pokemonRepository';
import { useAuth0 } from '@auth0/auth0-vue';

const pokemonRepo = new PokemonRepository();

  export default {
    props: {
      timerActive: {
        type: Boolean,
        required: true,
      },
      generation: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        chosenPokemon: "",
        score: 0,
        pokemonName: "",
        pokemonId: "",
        pokemonArt: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png",

        btnIsDisabled: false,
        inputIsDisabled: true,
      };
    },
    
    watch: {
      timerActive(value) {
        if (!value) {
          this.btnIsDisabled = false;
          this.inputIsDisabled = true;
          this.chosenPokemon = '';
        }
      },
      selectedOption: {
        handler: 'sendSelectedOptionToBackend',
        immediate: true,
      },
    },

    methods: {
      async fetchPokemon(generation) {
        const token = await this.$auth0.getAccessTokenSilently();
        try {
          await pokemonRepo.fetchPokemon(generation, token);
          this.pokemonName = pokemonRepo.pokemonName;
          this.pokemonId = pokemonRepo.pokemonId;
          this.pokemonArt = pokemonRepo.pokemonArt;
        } catch (error) {
          console.error('Error fetching Pokemon:', error);
        }
      },
      
      checkIfCorrect(){
        fetch('/api/guess/iscorrect/' + this.chosenPokemon.toLowerCase())
        .then(response => {
            return response.json();
        })
        .then(apiResponse => {
        if (apiResponse === true) {
            console.log('You guessed correctly!');
            this.chosenPokemon = '';
            this.fetchPokemon(this.generation);
            this.score++;
            this.$emit('score', this.score);
        } 
            })
      },
      skipPokemon(){
         this.chosenPokemon = '';
         this.focusInput();
         this.fetchPokemon(this.generation);
        },
        
      startTimer(){
        this.$emit('timerStarted', true);
        this.score = 0;
        this.chosenPokemon = '';
        this.btnIsDisabled = true;
        this.inputIsDisabled = false;
        this.fetchPokemon(this.generation);
        this.focusInput();
        this.resetGuessedPokemon();
               
      },
      async resetGuessedPokemon(){
        try {
          await pokemonRepo.resetGuessedPokemon();
        } catch (error) {
          console.error('Error resetting guessed Pokemon:', error);
        }
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
  @import '/src/assets/practice.css';
</style>







