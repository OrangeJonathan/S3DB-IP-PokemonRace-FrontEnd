<template>
  <div class="chatbox">
    <div class="chatbox-header">
      <h3 class="text-lg font-semibold text-gray-800 text-center">{{ selectedFriend.username }}</h3>
    </div>
    <div class="chatbox-messages">
      <div v-for="(item, index) in received_messages.slice().reverse()" :key="index" :class="{ ' message-self ': item.senderId === this.user.sub, ' message-other ': item.senderId === selectedFriend.auth0Id}">
        {{ item.content }}
      </div>
    </div>
    <div class="chatbox-input">
      <input
        v-model="send_message"
        @keyup.enter="send"
        type="text"
        placeholder="Type your message..."
        class="w-10/12 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-200"
      />
      <button @click="send" class="ml-5 bg-gradient-to-r from-lime-400 to-lime-200 px-4 py-2 rounded-full shadow-md hover:shadow-lg">
        Send
      </button>
    </div>
  </div>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import authService from '@/service/authService.js';
import axios from 'axios';

export default {
  name: "websockettest",
  props: {
    selectedFriend: '',
  },
  setup() {
    const { user, isAuthenticated } = authService();

    return { user, isAuthenticated};
  },
  data() {
    return {
      received_messages: [],
      send_message: '',
      connected: false,
    };
  },
  methods: {
    send() {
        console.log("Send message:" + this.send_message);
        if (this.send_message === "") {
            return;
        }
        // Add the sent message to the local list immediately
        const sentMsg = {
            content: this.send_message,
            senderId: this.user.sub,
            recipientId: this.selectedFriend.auth0Id
        };
        this.received_messages.push(sentMsg);

        if (this.stompClient && this.stompClient.connected) {
            const msg = {
                content: this.send_message,
                senderId: this.user.sub,
                recipientId: this.selectedFriend.auth0Id
            };
            console.log(this.selectedFriend);
            this.stompClient.send(`/app/hello/${this.selectedFriend.auth0Id}`, JSON.stringify(msg), {});
            this.send_message = "";
        }
    },
    connect() {
        this.socket = new SockJS("http://localhost:8080/websocket");
        this.stompClient = Stomp.over(this.socket);
        this.stompClient.connect(
            {},
            frame => {
                this.connected = true;
                console.log(frame);

                // Subscribe to the correct topic
                this.stompClient.subscribe(`/topic/private/${this.user.sub}`, tick => {
                    console.log(tick);
                    const receivedMsg = {
                        content: JSON.parse(tick.body).content,
                        senderId: JSON.parse(tick.body).senderId,
                        receiverId: JSON.parse(tick.body).recipientId
                    };
                    // Update the local list with the server's response
                    this.received_messages.push(receivedMsg);
                });
            },
        error => {
          console.log(error);
          this.connected = false;
        }
      );
    },
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
      this.connected = false;
    },
    tickleConnection() {
      this.connected ? this.disconnect() : this.connect();
    },
    async getChatMessages() {
      const token = await this.$auth0.getAccessTokenSilently();
      await axios.get("/api/chat", {
        params: {
          senderId: this.user.sub,
          receiverId: this.selectedFriend.auth0Id
        },
        headers: {
           Authorization: `Bearer ${token}`,
        },
      }).then(response => {
        this.received_messages = response.data;
      });
    },
    switchFriend() {
      this.received_messages = [];
      console.log("Switching friend to: " + this.selectedFriend)
      this.getChatMessages();
    },
  },
  mounted() {
    this.connect();
    this.getChatMessages();
  },
  watch: {
    // Watch for changes in the selectedFriend prop
    selectedFriend(value) {
      this.switchFriend();  
    },
  },
};
</script>

<style>
.chatbox {
  width: 600px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.chatbox-header {
  background-color: #f5f5f5;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.chatbox-messages {
  max-height: 600px;
  min-height: 600px;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column-reverse; /* This will reverse the stacking order of the flex items */
}


.chatbox-messages::-webkit-scrollbar {
  width: 8px;
}

.chatbox-messages::-webkit-scrollbar-thumb {
  background-color: #888; 
    }

.chatbox-messages::-webkit-scrollbar-track {
  background-color: #eee;
 }


.message {
  margin-bottom: 10px;
}

.message-self {
  background-color: #d1f5e1;
  padding: 8px;
  border-radius: 8px;
  align-self: flex-end;
}

.message-other {
  background-color: #e0e0e0;
  padding: 8px;
  border-radius: 8px;
  align-self: flex-start;
}

.chatbox-input {
  padding: 10px;
  border-top: 1px solid #ddd;
}

button {
  cursor: pointer;
}
</style>