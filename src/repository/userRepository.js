import axios from 'axios';

class userRepository {
    async SendUserToBackend(username, auth0_id, email, token) {
        try {
          const response = await axios.post('/api/users', {
              username: username,
              auth0Id: auth0_id,
              email: email,
            }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          // Check if the response is OK (status code 200-299)
          if (response.status < 200 || response.status >= 300) {
            throw new Error('Network response was not ok');
          }
        } catch (error) {
          // Handle errors
          console.error('Error sending user to database', error);
          throw error; // Re-throw the error to be caught by the Vue method
        }
      }
}

export default userRepository;