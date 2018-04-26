// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Feathers from '@feathersjs/feathers'
import axios from 'axios'
import rest from '@feathersjs/rest-client'
import auth from '@feathersjs/authentication-client'

import App from './App'
import router from './router'
import store from './store'

const feathers = Feathers()
const restClient = rest(process.env.API_BASE_URL)

feathers.configure(restClient.axios(axios)).configure(
  auth({
    storage: window.localStorage
  })
)

Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  data: {
    feathers
  },
  template: '<App/>',
  components: {App}
})
