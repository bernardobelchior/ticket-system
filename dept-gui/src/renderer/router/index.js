import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/components/LandingPage'
import SignUp from '@/components/SignUp'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import ShowSecondaryQuestions from '@/components/secondary-questions/ShowAll'
import ShowSecondaryQuestion from '@/components/secondary-questions/Show'

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
      path: '/secondary-questions/show',
      label: 'Show Secondary Questions',
      component: ShowSecondaryQuestions,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/secondary-questions/show/:id',
      label: 'Show Secondary Questions',
      component: ShowSecondaryQuestion,
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
