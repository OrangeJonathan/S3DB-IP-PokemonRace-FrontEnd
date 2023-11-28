<template>
    <div>
      <input v-model="message" placeholder="Type a message" />
      <button @click="sendMessage">Send</button>
      <ul>
        <li v-for="(message, index) in messages" :key="index">{{ message }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  import io from 'socket.io-client';
  
  export default {
    data() {
      return {
        message: '',
        messages: [],
      };
    },
    mounted() {
      this.socket = io('http://localhost:8080'); // replace with your server URL
      this.socket.on('topic/messages', (message) => {
        this.messages.push(message);
      });
    },
    methods: {
      sendMessage() {
        this.socket.emit('/app/send/message', this.message);
        this.message = '';
      },
    },
  };
  </script>
  