<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <!-- New Game Section -->
          <router-link v-show="!this.$root.appError.name" class="button is-primary is-large" :to="{ name: 'NewGame' }">New Game</router-link>
        </div>
        <div class="column">
          <!-- Join Section -->
          <router-link v-show="!this.$root.appError.name" class="button is-primary is-large" :to="{ name: 'JoinGame' }">Join Game</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Landing',
  data () {
    return {
      
    }
  },

  mounted() {
    this.$root.appError = {};
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
