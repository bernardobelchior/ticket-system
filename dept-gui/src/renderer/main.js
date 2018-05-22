import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Feathers from '@feathersjs/feathers'
import auth from '@feathersjs/authentication-client'
import locale from 'element-ui/lib/locale/lang/en'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'

import App from './App'
import router from './router'
import store from './store'

const feathers = Feathers()
const socket = io(process.env.API_BASE_URL, {
  transports: ['websocket'],
  forceNew: true
})

feathers
  .configure(socketio(socket))
  .configure(
    auth({
      storage: window.localStorage
    })
  )

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ElementUI, {locale})

feathers.authenticate()
  .then(response => {
    store.commit('login', response.accessToken)
  })
  .catch(() => {
    store.commit('logout')
    router.push('/')
  }).then(() => {
    /* eslint-disable no-new */
    new Vue({
      components: {App},
      router,
      store,
      data: {
        feathers
      },
      template: '<App/>'
    }).$mount('#app')
  })
