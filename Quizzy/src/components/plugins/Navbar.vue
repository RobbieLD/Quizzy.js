<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <!-- Just using the vue logo here as i'm too lazy to make my own just yet -->
        <router-link class="navbar-item" :to="{ name: 'Landing' }"><span id="smallLogo">Q</span></router-link>

        <a class="navbar-burger burger" v-bind:class="{'is-active' : burgerActive}" v-on:click="toggleBurger">
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>
      <div class="navbar-menu" v-bind:class="{'is-active' : burgerActive}">
        <div class="navbar-start">
          <router-link v-show="!this.$root.appError.name" class="navbar-item" :to="{ name: 'NewGame' }">New Game</router-link>
          <router-link v-show="!this.$root.appError.name" class="navbar-item" :to="{ name: 'JoinGame' }">Join Game</router-link>
        </div>
      </div>
  </nav>
</template>

<script>
export default {
    name: 'Navbar',
    data() {
      return {
        burgerActive: false
      }
    },

    methods: {
      toggleBurger() {
        this.burgerActive = !this.burgerActive;
      }
    }
}
</script>

<style scoped>
  #smallLogo {
    font-size: 2rem;
    color: #00d1b2
  } 
</style>
