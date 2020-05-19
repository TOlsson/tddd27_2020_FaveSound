import Vue from 'vue'
import Router from 'vue-router'
import search from '@/components/search'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/search',
      name: 'search',
      component: search
    }
  ]
})
