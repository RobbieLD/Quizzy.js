<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" :to="{ name: 'Landing' }"><img src="./assets/logo.png"></router-link>
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
    
    <router-view/>
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
