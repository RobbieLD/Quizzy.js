<template>
  <div class="box">
      <question v-bind:allready="allready"></question>
  </div>
</template>

<script>
import Question from '@/components/plugins/Question'

export default {
    name: 'Game',
    props: ['gamecode','players','username', 'allready'],
    components: {
        Question
    },

    data() {
        return {
        }
    },

    sockets: {
        gameError (message) {
            console.log("There was a game error: " + message);
            this.$root.appError = {
                name: 'Game Error',
                message: message
            };
        }
    },
    
    mounted () {
        console.log('Client joining');
        this.$socket.emit('join', { userName: this.username, gameCode: this.gamecode } );
    },

    beforeDestroy () {
        // we need to let the server know we're disconnecting. 
        console.log("Client Leaving");
        this.$socket.emit('leave', { userName: this.username, gameCode: this.gamecode });
    }
}
</script>

<style>

</style>
