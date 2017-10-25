<template>
  <div class="container">
      <div class="has-text-centered">
          {{ question.question }}
      </div>
      <nav class="level">
          <div v-for="(answer, index) in allAnswers" v-bind:key="index" 
            class="level-item has-text-centered">
            <label class="radio">
                <input type="radio" name="question" v-bind:value="answer">
                {{ answer }}
            </label>
        </div>
      </nav>
  </div>
</template>

<script>
export default {
    name: 'Question',
    props: ['question'],
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

    methods: {
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
