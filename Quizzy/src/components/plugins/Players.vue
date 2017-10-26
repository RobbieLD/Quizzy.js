<template>
  <div class="box">
          <table class="table">
              <thead>
                  <tr>
                      <th>Rank</th>
                      <th>Name</th>
                      <th>Score</th>
                      <th>Status</th>
                      <th>Ready</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(player, key, index) in sortedPlayers" v-bind:key="index" v-bind:class="{ 'is-selected' : player.userName == username}">
                    <td>{{ index + 1 }}</td>
                    <td>{{ player.userName }}</td>
                    <td>{{ player.score }}</td>
                    <td>{{ player.status }}</td>
                    <td v-if="player.userName == username"><input type="checkbox" v-on:click="readyPlayer" name="ready"></td>
                    <td v-if="player.userName != username">{{ player.ready ? 'Yes' : 'No' }}</td>
                 </tr>
              </tbody>
          </table>
      </div>
</template>

<script>
export default {
    name: 'Players',
    props: ['players','username'],
    computed: {
        sortedPlayers() {
            Object.keys(this.players).sort((a, b) => this.players[b].score - this.players[a].score);
            return this.players;
        },
        
        currentPlayer() {
            return this.players[this.username];
        }
    },

    methods: {
        readyPlayer(event) {
            this.$socket.emit('readyUpdate', event.target.checked);           
        }
    }
}
</script>

<style>

</style>
