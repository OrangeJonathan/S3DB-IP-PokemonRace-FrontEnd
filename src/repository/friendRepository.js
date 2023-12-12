import axios from 'axios';

class friendRepository {
    async fetchAcceptedFriends(token, auth0Id) {
        try {
            const response = await axios.get('/api/friends', {
                params: {
                    auth0Id: auth0Id,
                    accepted: true,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status < 200 || response.status >= 300) {
                throw new Error('Network response was not ok');
            }

            const data = response.data;
            this.friends = data;

        } catch (error) {
            console.error('Error getting accepted friends', error);
            throw error;
        }
    }

    async fetchPendingFriends(token, auth0Id) {
        try {
            const response = await axios.get('/api/friends/pending', {
                params: {
                    auth0Id: auth0Id,
                    accepted: false,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status < 200 || response.status >= 300) {
                throw new Error('Network response was not ok');
            }
            const data = response.data;
            this.pendingFriends = data;
        } catch (error) {
            console.error('Error getting pending friends', error);
            throw error;
        }
    }

    async sendFriendRequest(token, auth0Id, email) {
        try {
            const response = await axios.post('/api/friends', null, {
                params: {
                    senderAuth0Id: auth0Id,
                    receiverEmail: email,
                },
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

    async acceptFriendRequest(token, auth0Id, friend)
    {
        try {
            const response = await axios.put('/api/friends', null, {
                params: {
                    senderAuth0Id: friend.auth0_id,
                    receiverAuth0Id: auth0Id,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status < 200 || response.status >= 300) {
                throw new Error('Network response was not ok');
              }
        } catch (error) {
            console.error('Error accepting friend ', error);
          throw error;
        }
    }

    async removeFriend(token, auth0Id, friend)
    {
        try {
            const response = await axios.delete('/api/friends', {
                params: {
                    senderAuth0Id: friend.auth0_id,
                    receiverAuth0Id: auth0Id,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status < 200 || response.status >= 300) {
                throw new Error('Network response was not ok');
              }
            } catch (error) {
            console.error('Error removing friend ', error);
            }
    }
}

export default friendRepository;