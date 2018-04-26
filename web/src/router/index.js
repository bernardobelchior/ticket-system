import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import CreateTicket from '@/components/tickets/Create'
import ShowTicket from '@/components/tickets/Show'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'sign-up',
      component: SignUp
    },
    {
      path: '/tickets/create',
      name: 'create-ticket',
      component: CreateTicket
    },
    {
      path: '/tickets/show/:id',
      name: 'show-ticket',
      component: ShowTicket
    }
  ]
})
