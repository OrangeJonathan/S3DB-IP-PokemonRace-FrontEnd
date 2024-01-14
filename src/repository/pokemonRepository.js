import axios from 'axios';

class PokemonRepository {
   async fetchPokemon(generation, token) {
    try {
      const response = await axios.get('/api/guess/pokemon', {
        params: {
          generation: generation,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        }
      });

      // Check if the response is OK (status code 200-299)
      if (response.status < 200 || response.status >= 300) {
        throw new Error('Network response was not ok');
      }

      const data = response.data;

      // Handle the data
      this.pokemonId = data.id;
      this.pokemonName = data.name;
      this.pokemonArt = data.imageString;
    } catch (error) {
      // Handle errors  
      console.error('Error fetching data:', error);
      throw error; // Re-throw the error to be caught by the Vue method
    }
  }

  async resetGuessedPokemon(token) {
        try{
            const response = await axios.post('/api/guess/pokemon/reset', null , {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            // Check if the response is OK (status code 200-299)
            if (response.status < 200 || response.status >= 300) {
            throw new Error('Network response was not ok');
            }
        }
        catch (error) {
        // Handle errors
        console.error('Error resetting pokemon', error);
        throw error; // Re-throw the error to be caught by the Vue method
        }
    }
}

export default PokemonRepository;