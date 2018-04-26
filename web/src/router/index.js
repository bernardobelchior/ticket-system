import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import CreateTicket from '@/components/tickets/Create'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/tickets/create',
      name: 'create-ticket',
      component: CreateTicket
    }
  ]
})
