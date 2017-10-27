<template>
  <div class="section">
      <h4 class="title is-4">Players</h4>
      <players v-bind:players="players" v-bind:username="username"></players>

      <h4 class="title is-4">Game Code: {{ gamecode }}</h4>
      <game v-bind:allready="allReady" v-bind:gamecode="gamecode" v-bind:players="players" v-bind:username="username"></game>

      <h4 class="title is-4">Chat</h4>
      <chat v-bind:username="username" v-bind:gamecode="gamecode"></chat>
  </div> 
</template>

<script>
import Chat from '@/components/plugins/Chat'
import Game from '@/components/plugins/Game'
import Players from '@/components/plugins/Players'

export default {
    name: 'GameLobby',
    props: ['username', 'gamecode'],
    data() {
        return {
            players: {},
            allReady: false
        }
    },

    components: {
        Chat,
        Game,
        Players
    },
    
    computed: {
        allPlayersReady() {
            return Object.keys(this.players).every(name => this.players[name].ready);
        }
    },

    sockets: {
        playersUpdate (users) {
            console.log('Updating players');
            this.players = users;
            this.allReady = this.allPlayersReady;
        }   
    }
}
</script>

<style>

</style>
