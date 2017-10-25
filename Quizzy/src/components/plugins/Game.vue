<template>
  <!-- TODO: add in here actual game....that's a rater big TODO i'll admit. -->
  <div class="box">
          TODO: Add the game component in here (Lots of other stuff to do first)
      </div>
</template>

<script>
export default {
    name: 'Game',
    props: ['gamecode','players','username'],
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
