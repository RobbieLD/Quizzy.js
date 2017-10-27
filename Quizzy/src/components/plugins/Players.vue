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
                  <tr v-for="(player, index) in sortedPlayers" v-bind:key="index" v-bind:class="{ 'is-selected' : player.userName == username}">
                    <td>{{ index + 1 }}</td>
                    <td>{{ player.userName }}</td>
                    <td>{{ player.score }}</td>
                    <td>{{ player.status }}</td>
                    <td v-if="player.userName == username && !currentPlayer.ready">
                            <input type="checkbox" v-on:click="readyPlayer" v-bind="currentPlayer.ready" name="ready">
                    </td>
                    <td v-if="player.userName != username || currentPlayer.ready">{{ player.ready ? 'Yes' : 'No' }}</td>
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
            return Object.values(this.players).sort((a, b) => b.score - a.score);
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
