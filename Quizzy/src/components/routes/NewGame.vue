<template>
  <section class="section">
      <div class="field">
          <label class="label">Name</label>
          <div class="control">
              <input type="text" v-model="username" class="input" placeholder="Enter A Name" name="username" v-validate="'required'">
              <span v-show="errors.has('username')" class="help is-danger">{{ errors.first('username')}}</span>
          </div>
      </div>
      <div class="field">
          <router-link v-if="!isNaN(gamecode) && username && !this.$root.appError.name" class="button is-primary is-large" 
            v-bind:to="{ name: 'GameLobby', params: { username: username, gamecode: gamecode }}">Create Game</router-link>
      </div>
  </section>
</template>

<script>
export default {
    name: 'NewGame',
    data () {
        return {
            username: '',
            gamecode: ''
        }
    },

    sockets: {
        gameCreated (code) {
            console.log("New Game Code: " + code);
            this.gamecode = code;
        }
    },

    mounted () {
        // TODO: Probably should put some kind of rate limit on this
        this.$socket.emit('createGame');
    }
}
</script>

<style>

</style>
