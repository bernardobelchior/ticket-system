import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import ElementUI from 'element-ui'
import Feathers from '@feathersjs/feathers'
import Vue from 'vue'
import auth from '@feathersjs/authentication-client'
import axios from 'axios'
import io from 'socket.io-client'
import locale from 'element-ui/lib/locale/lang/en'
import router from './router'
import socketio from '@feathersjs/socketio-client'
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
  .then(result => {
    store.commit('login', result.accessToken)
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
