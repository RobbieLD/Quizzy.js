<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <!-- Just using the vue logo here as i'm too lazy to make my own just yet -->
        <router-link class="navbar-item" :to="{ name: 'Landing' }"><img src="../../assets/logo.png"></router-link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link v-show="!this.$root.appError.name" class="navbar-item" :to="{ name: 'NewGame' }">New Game</router-link>
          <router-link v-show="!this.$root.appError.name" class="navbar-item" :to="{ name: 'JoinGame' }">Join Game</router-link>
        </div>
      </div>
      <!-- TODO: Hook up the events for the buger menu -->
      <button class="button navbar-burger">
        <span></span>
        <span></span>
        <span></span>
      </button>
  </nav>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style>

</style>
