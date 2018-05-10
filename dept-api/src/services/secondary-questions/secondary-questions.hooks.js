const {authenticate} = require('@feathersjs/authentication').hooks
const {iff} = require('feathers-hooks-common')

const isState = state => hook => {
  return hook.data.state === state
}

const attachUserId = hook => {
  hook.data.userId = hook.params.payload.userId
}

//TODO: 
const sendToIT = hook => {
    throw new Error('Unimplemented')
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
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
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
  }
}
