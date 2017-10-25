<template>
  <div class="box">
      <!-- TODO: Make the max number of questions dynamic -->
      <progress class="progress" v-bind:value="questionNumber" max="10">{{ questionNumber }}</progress>
      <question v-bind:question="question"></question>
      <!-- TODO: Timer -->
  </div>
</template>

<script>
import Question from '@/components/plugins/Question'

export default {
    name: 'Game',
    props: ['gamecode','players','username'],
    components: {
        Question
    },

    data() {
        return {
            questionNumber: 3,
            question: {
                "category": "Geography",
                "type": "multiple",
                "difficulty": "medium",
                "question": "What European country is not a part of the EU?",
                "correct_answer": "Norway",
                "incorrect_answers": [
                    "Lithuania",
                    "Ireland",
                    "Czechia"
                ]
            }
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
