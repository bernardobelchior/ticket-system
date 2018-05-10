import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'

Vue.use(Vuex)

const state = {
  loggedIn: !!window.localStorage.getItem('feathers-jwt'),
  userId: null
}

const getters = {}

const mutations = {
  logout: function (state) {
    window.localStorage.removeItem('feathers-jwt')
    state.loggedIn = false
    state.userId = null
  },
  login: function (state, id) {
    state.loggedIn = true
    state.userId = id
  }
}

const actions = {}

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production',
  state,
  getters,
  mutations,
  actions
})
