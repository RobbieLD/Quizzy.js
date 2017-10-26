<template>
  <div class="container">
      <div v-if="!status">
        <progress class="progress" v-bind:value="questionNumber" max="10">{{ questionNumber }}</progress>
        <div class="has-text-centered" v-html="question.question"></div>
        <nav class="level">
            <div v-for="(answer, index) in allAnswers" v-bind:key="index" 
                class="level-item has-text-centered">
                <label class="radio">
                    <input type="radio" name="question" v-on:click="answerQuestion(answer)" v-bind:value="answer">
                    {{ answer }}
                </label>
            </div>
        </nav>
      </div>
      <div v-if="status" >
          <div class="has-text-centered">{{ status }}</div>
          <button v-if="questionNumber && status != 'Finished'" class="button is-primary" v-on:click="nextQuestion">Next Question</button>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Question',
    props:['allready'],
    data() {
        return {
            status: 'Waiting for all players to be ready to start the game',
            questionNumber: 0,
            question: {}
        }
    },

    computed: {
        allAnswers() {
            console.log()
            var answers = this.question.incorrect_answers;
            answers.push(this.question.correct_answer);
            console.log(answers.length);
            this.shuffle(answers);
            return answers;
        }
    },

    watch: {
        allready(value) {
            if (value) {
                this.nextQuestion();
            }
        }
    },

    sockets: {
        advanceQuestion(question) {
            if (!question) {
                // we've finished the quiz
                this.status = "Finished"
                return;
            }

            this.question = question;
            this.questionNumber++;
            this.status = '';
        }
    },

    methods: {
        answerQuestion(answer) {
            var correct = answer == this.question.correct_answer;
            
            this.$socket.emit('questionAnswered', correct);

            if (correct) {
                this.status = "Correct, well done!";
            }
            else {
                this.status = `Sorry the correct answer was ${this.question.correct_answer}`;
            }
            
        },

        nextQuestion() {
            this.$socket.emit('nextQuestion');
        },

        shuffle(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }
    }
}
</script>

<style>

</style>
