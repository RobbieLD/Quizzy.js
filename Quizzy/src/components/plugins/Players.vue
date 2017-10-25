<template>
  <div class="box">
          <table class="table">
              <thead>
                  <tr>
                      <th>Rank</th>
                      <th>Name</th>
                      <th>Score</th>
                      <th>Ready</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(player, index) in players" v-bind:key="index" v-bind:class="{ 'is-selected' : player.userName == username}">
                    <td>{{ index + 1 }}</td>
                    <td>{{ player.userName }}</td>
                    <td>{{ player.score }}</td>
                    <td v-if="player.userName == username"><input type="checkbox" name="ready"></td>
                    <td v-if="player.userName != username">{{ player.ready ? 'Yes' : 'No' }}</td>
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
