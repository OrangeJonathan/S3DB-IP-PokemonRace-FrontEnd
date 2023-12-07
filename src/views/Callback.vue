<template>
    <div>
        finalizing authentication...
        <br />
        {{ user }}
    </div>
</template>

<script>
import UserRepository from '../repository/userRepository';
import authService from '@/service/authService.js';

const userRepo = new UserRepository();

export default {
    setup() {
        const { user, isAuthenticated } = authService();

        return { user, isAuthenticated };
    },
    methods: {
        async sendUserToBackend(token) {
            try {
                const username = this.user.name;
                const auth0_id = this.user.sub;
                const email = this.user.email
                console.log(username);
                console.log(auth0_id);
                await userRepo.SendUserToBackend(username, auth0_id, email, token);
            } catch (error) {
                console.error('Error sending user to backend:', error);
            }
        },
    },
    async mounted() {
        const token = await this.$auth0.getAccessTokenSilently();
        this.sendUserToBackend(token);
        this.$router.push({ name: 'home' });
    },
};
</script>