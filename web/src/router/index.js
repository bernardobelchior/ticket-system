import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import Home from '@/components/Home'
import SignUp from '@/components/SignUp'
import CreateTicket from '@/components/tickets/Create'
import ShowTicket from '@/components/tickets/Show'
import ShowTickets from '@/components/tickets/ShowAll'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      label: 'Home',
      component: Home
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
      label: 'Sign Up',
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
    }
  ]
})

router.beforeEach((to, from, next) => {
  let isLoggedIn = window.localStorage.getItem('feathers-jwt')

  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
    next('login')
  } else if (to.matched.some(record => record.meta.requiresNoAuth) && isLoggedIn) {
    next('home')
  } else {
    next()
  }
})

export default router
