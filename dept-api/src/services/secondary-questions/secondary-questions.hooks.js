const axios = require('axios')
const {
  authenticate
} = require('@feathersjs/authentication').hooks
const {
  iff
} = require('feathers-hooks-common')
const serverToken = '3DF1A7FF-F69D-9545-7EE1-43CE710EA0F1'

const isState = state => hook => {
  return hook.data.state === state
}

const removeSolvedQuestions = hook => {
  hook.result.data = hook.result.data.filter(question => question.state !== 'solved') 

  return hook
}

const attachUserId = hook => {
  hook.data.userId = hook.params.payload.userId
}

const sendToIT = hook => {
  return axios.patch(`${hook.app.get('it-address')}/secondary-questions/${hook.result.originalId}`, {
    answer: hook.result.answer,
    state: 'solved',
    token: serverToken
  }).then(() => hook)
}

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [
      iff(
        isState('solved'),
        attachUserId
      )
    ],
    remove: []
  },

  after: {
    all: [],
    find: [
      removeSolvedQuestions
    ],
    get: [],
    create: [],
    update: [],
    patch: [
      iff(
        isState('solved'),
        sendToIT
      )
    ],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
