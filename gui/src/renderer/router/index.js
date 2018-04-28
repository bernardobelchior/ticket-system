import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/components/LandingPage'
import SignUp from '@/components/SignUp'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import CreateTicket from '@/components/tickets/Create'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      label: 'Home',
      component: LandingPage
    },
    {
      path: '/login',
      label: 'Login',
      component: Login,
      meta: {
        requiresNoAuth: true
      }
    },
    {
      path: '/signup',
      label: 'Sign-up',
      component: SignUp,
      meta: {
        requiresNoAuth: true
      }
    },
    {
      path: '/tickets/create',
      label: 'Create Ticket',
      component: CreateTicket,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/logout',
      label: 'Logout',
      component: Logout,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
