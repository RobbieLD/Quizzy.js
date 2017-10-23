<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <!-- Just using the vue logo here as i'm too lazy to make my own just yet -->
        <router-link class="navbar-item" :to="{ name: 'Landing' }"><img src="./assets/logo.png"></router-link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link v-show="!this.$root.appError.name" class="navbar-item" :to="{ name: 'NewGame' }">New Game</router-link>
          <router-link v-show="!this.$root.appError.name" class="navbar-item" :to="{ name: 'JoinGame' }">Join Game</router-link>
        </div>
      </div>
    </nav>
    <section v-if="this.$root.appError.name" class="hero is-danger">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ this.$root.appError.name }}
          </h1>
          <h2 class="subtitle">
            {{ this.$root.appError.message }}
          </h2>
        </div>
      </div>
    </section>
    <!-- Column setup -->
    <div class="columns">
      <div class="column"></div>
      <div class="column is-narrow">
        <router-view/>
      </div>
      <div class="column"></div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
    }
  },

  sockets: {
    connect_error(error) {
      console.log("Connect Error: " + error);
      this.$root.appError = {
        name: "Connect Error",
        message: error
      };
    },

    error(error) {
      console.log("Error: " + error);
      this.$root.appError = {
        name: "General Error",
        message: error
      };
    },

    connect() {
      console.log("Connected");
      this.$root.appError = { 
        name: '',
        message: ''
      }
    }
  }
}
</script>

<style>
#app {
}
</style>
