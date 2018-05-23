import Vue from 'vue'
import Vuex from 'vuex'
import jwt from 'jsonwebtoken'

import modules from './modules'

Vue.use(Vuex)

const state = {
  loggedIn: false,
  loggedInUserId: null
}

const getters = {}

const mutations = {
  logout: function (state) {
    window.localStorage.removeItem('feathers-jwt')
    state.loggedIn = false
    state.loggedInUserId = null
  },
  login: function (state, accessToken) {
    state.loggedIn = true
    state.loggedInUserId = jwt.decode(accessToken).id
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
