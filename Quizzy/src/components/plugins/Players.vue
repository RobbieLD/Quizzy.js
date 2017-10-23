<template>
  <div class="box">
          <table class="table">
              <thead>
                  <tr>
                      <th>Rank</th>
                      <th>Name</th>
                      <th>Score</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(player, index) in players" v-bind:key="index" v-bind:class="{ 'is-selected' : player.name == username}">
                    <td>{{ index + 1 }}</td>
                    <td>{{ player.name }}</td>
                    <td></td>
                 </tr>
              </tbody>
          </table>
      </div>
</template>

<script>
export default {
    name: 'Players',
    props: ['players','username']
}
</script>

<style>

</style>
