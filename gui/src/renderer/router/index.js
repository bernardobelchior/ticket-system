import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/components/LandingPage'
import SignUp from '@/components/SignUp'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      label: 'Home',
      component: LandingPage
    },
    {
      path: '/signup',
      name: 'sign-up',
      label: 'Sign-up',
      component: SignUp,
      meta: {
        requiresNoAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      label: 'Login',
      component: Login,
      meta: {
        requiresNoAuth: true
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
