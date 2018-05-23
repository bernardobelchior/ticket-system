import Vue from 'vue'
import Vuex from 'vuex'
import jwt from 'jsonwebtoken'

Vue.use(Vuex)

const state = {
  loggedIn: !!window.localStorage.getItem('feathers-jwt'),
  loggedInUserId: window.localStorage.getItem('feathers-jwt') ? jwt.decode(window.localStorage.getItem('feathers-jwt'), {complete: true}).payload.id : null
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
  state,
  getters,
  mutations,
  actions
})
