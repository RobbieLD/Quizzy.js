<template>
  <section class="section">
      <img class="has-text-centered" src="../../assets/logo.png">
      <div class="has-text-centered">Welcome to Quizzy</div>
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
