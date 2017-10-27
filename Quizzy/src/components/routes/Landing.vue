<template>
  <section class="section">
      <!-- <img class="has-text-centered" src="../../assets/logo.png"> -->
      <!-- <div id="logo" class="is-primary">Q</div> -->
      <canvas id="logo" height="300" width="300"></canvas>
      <!-- <div class="has-text-centered">Welcome to Quizzy</div> -->
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

    // Draw the logo
      var canvas = document.getElementById('logo');
      var context = canvas.getContext('2d');
      var centerX = canvas.width / 2;
      var centerY = canvas.height / 2;
      var radius = 100;

      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      context.lineWidth = 10;
      context.strokeStyle = '#00d1b2';
      context.stroke();

      context.beginPath();
      context.moveTo(150, 150);
      context.lineTo(290, 290);
      context.lineWidth = 30;
      context.stroke();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#logo {
  font-size: 20rem;
  color: #00d1b2;
  
}
</style>
