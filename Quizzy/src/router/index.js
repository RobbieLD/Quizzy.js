import Vue from 'vue'
import Router from 'vue-router'
import VeeValidate from 'vee-validate';
import Landing from '@/components/routes/Landing'
import NewGame from '@/components/routes/NewGame'
import JoinGame from '@/components/routes/JoinGame'
import GameLobby from '@/components/routes/GameLobby'
import Log from '@/components/routes/Log'
import TreeView from 'vue-json-tree-view'

Vue.use(TreeView)
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
    },
    {
      path:'/log/',
      name: 'Log',
      component: Log
    }
  ]
})
