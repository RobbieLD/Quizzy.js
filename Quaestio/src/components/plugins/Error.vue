<template>
  <section v-if="this.$root.appError.name" class="hero is-danger">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ this.$root.appError.name }}
          </h1>
          <h2 class="subtitle">
            {{ this.$root.appError.message }}
          </h2>
        </div>
      </div>
    </section>
</template>

<script>
export default {
    name: 'Error'
}
</script>

<style>

</style>
