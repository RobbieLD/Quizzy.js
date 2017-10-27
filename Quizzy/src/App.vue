<template>
  <div id="app">
    <error></error>
    <navbar></navbar> 
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
import Navbar from '@/components/plugins/Navbar'
import Error from '@/components/plugins/Error'

export default {
  name: 'app',
  data() {
    return {
    }
  },

  components: {
    Navbar,
    Error
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
</style>
