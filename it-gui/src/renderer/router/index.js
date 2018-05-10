import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/components/LandingPage'
import SignUp from '@/components/SignUp'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import ShowTickets from '@/components/tickets/ShowAll'
import ShowTicket from '@/components/tickets/Show'

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
      path: '/tickets/show',
      label: 'Show Tickets',
      component: ShowTickets,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/tickets/show/:id',
      label: 'Show Ticket',
      component: ShowTicket,
      meta: {
        requiresAuth: true,
        showOnNavbar: false
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
