<template>
  <section class="section">
      <img src="../assets/logo.png">
      <div class="welcome">Welcome to Quizzy</div>
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
.welcome {
  text-align: center;
}
</style>
