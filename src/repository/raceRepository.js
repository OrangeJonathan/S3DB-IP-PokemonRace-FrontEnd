import axios from 'axios';

class RaceRepository {

    async	getPendingRaces(playerAuth0Id, token) {
      try {
        const response = await axios.get('/api/race', {
          params: {
            auth0Id: playerAuth0Id,
            status: 'PENDING'
          },
            headers: {
              Authorization: `Bearer ${token}`,
          }
        }); 
        if (response.status < 200 || response.status >= 300) {
            throw new Error('Network response was not ok');
          }

          const data = response.data;
          this.pendingRaces = data;

      } catch (error) {
          console.error('Error getting accepted friends', error);
          throw error;
      }
    }

    // Create a new race
    async createRace(player1Auth0Id, player2Auth0Id, generation, timeLimit, token) {
        try {
            const response = await axios.post('/api/race', null, {
                params: {
                    player1Auth0Id: player1Auth0Id,
                    player2Auth0Id: player2Auth0Id,
                    generation: generation,
                    timeLimit: timeLimit
              }, 
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            if (response.status < 200 || response.status >= 300) {
                throw new Error('Network response was not ok');
              }
            } catch (error) {
              // Handle errors
              console.error('Error sending race invite', error);
              throw error; // Re-throw the error to be caught by the Vue method
            }
          
    }

    // Update an existing race
    async acceptRace(player2, token) {
      console.log("accepting");
      const response = await axios.post('/api/race/accept', null, {
        params: {
          player2Auth0Id: player2,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
    }
}

export default RaceRepository;