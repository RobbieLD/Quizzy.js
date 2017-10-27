<template>
  <div class="box">
          <div v-for="(msg, index) in messages" v-bind:key="index">
              <span v-bind:class="{'has-text-primary' : msg.sender == username}">{{ msg.sender }}</span> : {{ msg.message }}
          </div>
          <div class="field">
              <input type="text" v-model="message" v-on:keyup.enter="sendMessage" placeholder="Enter Chat Message" class="input">
          </div>
          <div class="field">
              <button class="button is-primary" v-on:click="sendMessage">Send</button>
          </div>
      </div>
</template>

<script>
export default {
    name: 'Chat',
    
    props: ['username','gamecode'],

    data() {
        return {
            messages: [],
            message: ''
        }
    },

    sockets: {
        chatMessage (message) {
            console.log("Chat message received:" + JSON.stringify(message));
            this.messages.push(message);
            //TODO: Make this number a config param
            if (this.messages.length > 10) {
                this.messages.shift();
            }
        }
    },

    methods: {
        sendMessage() {
            // emit the chat message event
            if (this.message) {
                console.log("Sending message: " + this.message);
                this.$socket.emit('sendMessage', {message: this.message, sender: this.username, gamecode: this.gamecode})
                this.message = '';
            }
        }
    }
}
</script>

<style>

</style>
