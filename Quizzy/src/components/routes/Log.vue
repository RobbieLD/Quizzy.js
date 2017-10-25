<template>
    <div class="container">
        <div v-for="(log, index) in logs" v-bind:key="index">
            {{ log.time }} - {{ log.message }}
            <div><tree-view v-if="log.object" v-bind:data="log.object" v-bind:options="{maxDepth: 3}"></tree-view></div>
        </div>
    </div>
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
