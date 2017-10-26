// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSocketio from 'vue-socket.io'
import 'bulma/css/bulma.css'

Vue.use(VueSocketio, 'http://9bf24bc5.ngrok.io');

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  data: {
    appError: {
      name: '',
      message: ''
    }
  }
})
