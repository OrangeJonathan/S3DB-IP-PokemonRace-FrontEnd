<template>
  <div class="chatbox">
    <div class="chatbox-header">
      <h3 class="text-lg font-semibold text-gray-800 text-center">{{ selectedFriend.username }}</h3>
    </div>
    <div class="chatbox-messages">
      <div v-for="(item, index) in received_messages.slice().reverse()" :key="index" :class="{ ' message-self ': item.sender_id === this.user.sub, ' message-other ': item.sender_id === selectedFriend.auth0_id}">
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
      <button @click="send" class="ml-7 bg-blue-200 text-black p-2 rounded p-2">
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
        // Add the sent message to the local list immediately
        const sentMsg = {
            content: this.send_message,
            sender_id: this.user.sub,
            recipientId: this.selectedFriend.auth0_id
        };
        this.received_messages.push(sentMsg);

        if (this.stompClient && this.stompClient.connected) {
            const msg = {
                content: this.send_message,
                sender_id: this.user.sub,
                recipientId: this.selectedFriend.auth0_id
            };
            console.log(this.selectedFriend);
            this.stompClient.send(`/app/hello/${this.selectedFriend.auth0_id}`, JSON.stringify(msg), {});
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
                        sender_id: JSON.parse(tick.body).sender_id,
                        recipientId: JSON.parse(tick.body).recipientId
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
    getChatMessages() {
      axios.get("/api/chat", {
        params: {
          senderId: this.user.sub,
          receiverId: this.selectedFriend.auth0_id
        }
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