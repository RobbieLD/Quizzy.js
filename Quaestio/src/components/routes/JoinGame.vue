<template>
  <section class="section">
      <div class="field">
          <label class="label">Name</label>
          <div class="control">
              <input type="text" class="input" placeholder="Enter User Name" 
              v-model="username" name="username" v-validate="'required'">
              <span v-show="errors.has('username')" class="help is-danger">{{ errors.first('username')}}</span>
          </div>
      </div>
      <div class="field">
          <label class="label">Game Code</label>
          <div class="control">
              <input type="text" class="input" placeholder="Enter Game Code" 
               v-model="gamecode" name="gamecode" v-validate="'required'">
              <span v-show="errors.has('gamecode')" class="help is-danger">{{ errors.first('gamecode')}}</span>
          </div>
      </div>
      <div class="field">
           <router-link v-if="!this.errors.any() && username && gamecode" class="button is-primary is-large" 
            v-bind:to="{ name: 'GameLobby', params: { username: username, gamecode: gamecode }}">Join Game</router-link>
      </div>
      <div class="modal" v-bind:class="{'is-active' : showModal}">
          <div class="modal-background"></div>
          <div class="modal-content">
            <div class="box">
                {{ modalMessage }}
            </div>
          </div>
          <button class="modal-close is-large" v-on:click="showModal = false"></button>
      </div>
  </section>
</template>

<script>
export default {
    name: 'JoinGame',
    data() {
        return {
            username: '',
            gamecode: '',
            nextRoute: {},
            showModal: false,
            modalMessage: ''
        }
    },

    sockets : {
        joinValidated (resp) {
            console.log("Game Code Validation result: " + resp.valid);

            if(resp.valid) {
                this.nextRoute();
            }
            else {
                // show model popup about game code not being valid
                this.showModal = true;
                this.modalMessage = resp.message;
            }
        }
    },

    methods: {
        validateJoinRequest() {
            this.$socket.emit('validateJoin', { gameCode: this.gamecode, userName: this.username });
        }
    },

    beforeRouteLeave (to, from, next) {
        
        // Only prevent going to the lobby
        if (to.name == 'GameLobby') {      
            // save a reference to the next route
            this.nextRoute = next;

            // Check the game code
            this.validateJoinRequest();
        }
        else {
            next();
        }
    }
}
</script>

<style>

</style>
