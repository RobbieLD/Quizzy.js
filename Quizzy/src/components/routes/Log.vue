<template>
  <table>
      <tr v-for="(log, index) in logs" v-bind:key="index">
          <td>{{ log.time }}</td>
          <td>{{ log.message }}</td>
      </tr>
  </table>
</template>

<script>
export default {
    name: 'Log',
    data() {
        return {
            logs: []
        }
    },

    sockets: {
        log(entry) {
            this.logs.push(entry);
        }
    }
}
</script>

<style>

</style>
