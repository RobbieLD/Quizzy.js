import Vue from 'vue'
import Router from 'vue-router'
import VeeValidate from 'vee-validate';
import Landing from '@/components/Landing'
import NewGame from '@/components/NewGame'
import JoinGame from '@/components/JoinGame'
import GameLobby from '@/components/GameLobby'

Vue.use(VeeValidate)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/newgame/',
      name: 'NewGame',
      component: NewGame
    },
    {
      path: '/joingame/',
      name: 'JoinGame',
      component: JoinGame
    },
    {
      path: '/gamelobby/:gamecode/:username',
      name: 'GameLobby',
      component: GameLobby,
      props: true
    }
  ]
})
