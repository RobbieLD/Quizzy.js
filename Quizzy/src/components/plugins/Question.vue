<template>
  <div class="container">
      <div v-if="!status">
        
        <section class="hero is-primary">
            <div class="hero-body">
                <div class="container">
                <h1 class="title">
                    {{ question.category }}
                </h1>
                <h2 class="subtitle">
                    Difficulty: {{ question.difficulty }}
                </h2>
                </div>
            </div>
        </section>
        <progress class="progress is-radiusless is-primary" v-bind:value="questionNumber" max="10">{{ questionNumber }}</progress>
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
        <!-- <div class="has-text-centered">{{ status }}</div> -->
        <div class="field">
            <section class="hero has-text-centered" v-bind:class="answerHeroClass">
            <div class="hero-body">
                <div class="container">
                <h1 class="title">
                    {{ status }}
                </h1>
                </div>
            </div>
        </section>
        </div>
        <p class="field">
            <button v-if="questionNumber && showNextButton" class="button" v-bind:class="answerHeroClass" v-on:click="nextQuestion">Next Question</button>
        </p>
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
            question: {},
            showNextButton: true,
            answerHeroClass: ''
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
                this.status = "Finished, Press f5 to start a new round ;)";
                this.answerHeroClass = '';
                this.showNextButton = false;
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
                this.answerHeroClass = 'is-success';
            }
            else {
                this.status = `Sorry the correct answer was ${this.question.correct_answer}`;
                this.answerHeroClass = 'is-danger';
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
