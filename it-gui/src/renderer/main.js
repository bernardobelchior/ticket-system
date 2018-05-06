import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Feathers from '@feathersjs/feathers'
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

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ElementUI)

const dept = process.env.DEPT === 'IT' ? 'it' : 'dept'

/* eslint-disable no-new */
new Vue({
  components: {App},
  router,
  store,
  data: {
    feathers
  },
  template: '<App dept="' + dept + '"/>'
}).$mount('#app')
