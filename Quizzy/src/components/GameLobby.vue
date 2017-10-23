<template>
  <div class="section">
      <!-- <div class="box">
          <span>Username: {{ username }}</span>
          <span>Gamecode: {{ gamecode }}</span>
      </div>
       -->
      <!-- <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h4 class="title is-4">
            Gamecode: {{ gamecode }}
          </h4>
          <h5 class="subtitle is-5">
            Username: {{ username }}
          </h5>
        </div>
      </div>
    </section> -->

      <h4 class="title is-4">Players</h4>
      <div class="box">
          <table class="table">
              <thead>
                  <tr>
                      <th>Rank</th>
                      <th>Name</th>
                      <th>Score</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(player, index) in players" v-bind:key="index" v-bind:class="{ 'is-selected' : player.name == username}">
                    <td>{{ index + 1 }}</td>
                    <td>{{ player.name }}</td>
                    <td></td>
                 </tr>
              </tbody>
          </table>
      </div>
      <!-- TODO: add in here actual game....that's a rater big TODO i'll admit. -->
      <h4 class="title is-4">Game Code: {{ gamecode }}</h4>
      <div class="box">
          TODO: Add the game component in here (Lots of other stuff to do first)
      </div>
      <h4 class="title is-4">Chat</h4>
      <div class="box">
          <!-- The lobby chat console -->
          <div v-for="(msg, index) in messages.filter(m => m.gamecode == gamecode)" v-bind:key="index">
              {{ msg.sender }} : {{ msg.message }}
          </div>
          <div class="field">
              <input type="text" v-model="message" placeholder="Enter Chat Message" class="input">
          </div>
          <div class="field">
              <button class="button is-primary" v-on:click="sendMessage">Send</button>
          </div>
      </div>
  </div> 
</template>

<script>
export default {
    name: 'GameLobby',
    props: ['username', 'gamecode'],
    data() {
        return {
            players: [],
            messages: [],
            message: ''
        }
    },

    sockets: {

        playersUpdate (users) {
            console.log('Updating players');
            this.players = users;

        },

        gameError (message) {
            console.log("There was a game error: " + message);
            this.$root.appError = {
                name: 'Game Error',
                message: message
            };
        },

        chatMessage (message) {
            console.log("Chat message received:" + JSON.stringify(message));
            this.messages.push(message);
        }
    },


    mounted () {
        console.log('Client joining');
        this.$socket.emit('join', { name: this.username, code: this.gamecode } );
    },

    beforeDestroy () {
        // we need to let the server know we're disconnecting. 
        console.log("Client Leaving");
        this.$socket.emit('leave', { name: this.username, code: this.gamecode });
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
