<template>
  <div class="section">
      <div class="box">
          <span>Username: {{ username }}</span>
          <span>Gamecode: {{ gamecode }}</span>
      </div>
      <h3>Players</h3>
      <div class="box">
          <div v-for="player in players" v-bind:key="player.id">
              {{ player.name }}
          </div>
      </div>
      <div class="field">
          <router-link class="button is-primary is-large" to="/game/">Play</router-link>
      </div>
  </div> 
</template>

<script>
export default {
    name: 'GameLobby',
    props: ['username', 'gamecode'],
    data() {
        return {
            players: []
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
    }
}
</script>

<style>

</style>
