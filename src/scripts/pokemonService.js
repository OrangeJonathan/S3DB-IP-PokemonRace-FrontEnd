const app = Vue.createApp({
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
        { label: "Generation 9", value: 9 }],
    };
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
         });





// import { handleError } from 'vue';
// import axios from 'axios';

//   export const pokemonService = {
//     data() {
//       return {
//         chosenPokemon: "",
//         score: 0,
//         pokemonName: "",
//         pokemonId: "",
//         pokemonArt: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png",

//         btnIsDisabled: false,
//         inputIsDisabled: true,

//         timerEnabled: false,
//         timerCount: 60, 

//         options: [
//         { label: "All Generations", value: 0 }, 
//         { label: "Generation 1", value: 1 }, 
//         { label: "Generation 2", value: 2 },
//         { label: "Generation 3", value: 3 },
//         { label: "Generation 4", value: 4 },
//         { label: "Generation 5", value: 5 },
//         { label: "Generation 6", value: 6 },
//         { label: "Generation 7", value: 7 },
//         { label: "Generation 8", value: 8 },
//         { label: "Generation 9", value: 9 },],
//         selectedOption: "0",

//       };
//     },
    
//     watch: {
//         timerEnabled(value) {
//             if (value) {
//                 setTimeout(() => {
//                     this.timerCount--;
//                 }, 1000);
//             }
//         },

//         timerCount: {
//             handler(value) {

//                 if (value > 0 && this.timerEnabled) {
//                     setTimeout(() => {
//                         this.timerCount--;
//                     }, 1000);
//                 }
//                 else if (value == 0)
//                 {
//                     this.btnIsDisabled = false;
//                     this.inputIsDisabled = true;
//                     this.chosenPokemon = '';

//                 }

//             },
//             immediate: true
//             },

//             selectedOption: {
//               handler: 'sendSelectedOptionToBackend',
//               immediate: true,
//             },
//         },

//     methods: {
//       fetchPokemon() {
//         fetch('/api/guess/pokemon')
//           .then(response => {
//             return response.json();
//           })
//           .then(data => {
//             this.pokemonId = data.id;
//             this.pokemonName = data.name;
//             this.pokemonArt = data.imageString;
//           })
//           .catch(error => {
//             console.error('Error fetching data:', error);
//           });
//       },
//       sendSelectedOptionToBackend() {
//       const data = {
//         selectedOption: this.selectedOption,
//       };

//       axios.post('/api/guess/pokemon/generation ', data)
//         .catch(error => {
//           console.error('Error sending selected option to the backend:', error);
//         });
//       },

//       checkIfCorrect(){
//         fetch('/api/guess/pokemon/' + this.chosenPokemon.toLowerCase())
//         .then(response => {
//             return response.json();
//         })
//         .then(apiResponse => {
//         if (apiResponse === true) {
//             console.log('You guessed correctly!');
//             this.chosenPokemon = '';
//             this.fetchPokemon();
//             this.score++;
//         } 
//             })
//       },
//       skipPokemon(){
//          this.chosenPokemon = '';
//          this.focusInput();
//          this.fetchPokemon();
//         },
        
//       startTimer(){
//         this.timerCount = 60;
//         this.score = 0;
//         this.chosenPokemon = '';
//         this.btnIsDisabled = true;
//         this.inputIsDisabled = false;
//         this.fetchPokemon();
//         this.focusInput();
//         this.resetGuessedPokemon();
//         this.timerEnabled = true;
        
//       },
//       resetGuessedPokemon(){
//         axios
//         .post('/api/guess/pokemon/reset')
//         .catch((error) =>
//         {
//           console.error("Failed to reset pokemon", error);
//         })
//       },

//       focusInput() {
//         this.$nextTick(() => {
//         this.$refs.pokemonInput.focus();
//         });
//       },
//     },
//   };