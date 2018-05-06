import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'

Vue.use(Vuex)

const state = {
  loggedIn: !!window.localStorage.getItem('feathers-jwt')
}

const getters = {}

const mutations = {
  logout: function (state) {
    window.localStorage.removeItem('feathers-jwt')
    state.loggedIn = false
  },
  login: function (state) {
    state.loggedIn = true
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
