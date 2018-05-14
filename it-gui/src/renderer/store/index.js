import Vue from 'vue'
import Vuex from 'vuex'

import jwt from 'jsonwebtoken'
import modules from './modules'

Vue.use(Vuex)

const state = {
  loggedIn: !!window.localStorage.getItem('feathers-jwt'),
  loggedInUserId: jwt.decode(window.localStorage.getItem('feathers-jwt'), {complete: true}).payload.id,
  depts: [
    {
      name: 'Other Department',
      value: '1'
    }
  ]
}

const getters = {}

const mutations = {
  logout: function (state) {
    window.localStorage.removeItem('feathers-jwt')
    state.loggedIn = false
    state.loggedInUserId = null
  },
  login: function (state, id) {
    state.loggedIn = true
    state.loggedInUserId = id
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
