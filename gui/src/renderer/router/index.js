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
      component: LandingPage
    },
    {
      path: '/signup',
      name: 'sign-up',
      component: SignUp
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
