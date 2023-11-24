<template>
  <div class="container">
    <div class="info">
      <p class="score">Correctly Guessed: {{ score }}</p>
    </div>
    <div class="main-content">
      <div class="options">
        <div v-for="(option, index) in options" :key="index">
          <input :disabled="btnIsDisabled" type="radio" :id="`option-${index}`" :value="option.value" v-model="selectedOption" />
          <label :for="`option-${index}`">{{ option.label }}</label>
        </div>
      </div>
      <div class="image">
        <img :src="pokemonArt" alt="Pokémon">
      </div>
    </div>
    <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" :disabled="btnIsDisabled" @click="startTimer">Start</button>
    <br>
    <input ref="pokemonInput" class="center" :disabled="inputIsDisabled" type="text" v-model="chosenPokemon" @input="checkIfCorrect">
    <p class="py-">
      <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 center border border-gray-400 rounded shadow" :disabled="inputIsDisabled" @click="skipPokemon">Skip</button>
    </p>
  </div>
</template>

<script>
import axios from 'axios';

  export default {
    props: {
      timerActive: {
        type: Boolean,
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

        options: [
        { label: "All Generations", value: 0 }, 
        { label: "Generation 1", value: 1 }, 
        { label: "Generation 2", value: 2 },
        { label: "Generation 3", value: 3 },
        { label: "Generation 4", value: 4 },
        { label: "Generation 5", value: 5 },
        { label: "Generation 6", value: 6 },
        { label: "Generation 7", value: 7 },
        { label: "Generation 8", value: 8 },
        { label: "Generation 9", value: 9 },],
        selectedOption: "0",

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
      sendSelectedOptionToBackend() {
      const data = {
        selectedOption: this.selectedOption,
      };

      axios.post('/api/guess/pokemon/generation ', data)
        .catch(error => {
          console.error('Error sending selected option to the backend:', error);
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
        this.$emit('timerStarted', true);
        this.score = 0;
        this.chosenPokemon = '';
        this.btnIsDisabled = true;
        this.inputIsDisabled = false;
        this.fetchPokemon();
        this.focusInput();
        this.resetGuessedPokemon();
               
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
  @import '/src/assets/practice.css';
</style>







