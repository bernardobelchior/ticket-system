const {authenticate} = require('@feathersjs/authentication').hooks

const attachUserId = hook => {
  hook.data.userId = hook.params.payload.id
}

const attachSolverId = hook => {
  hook.data.solverId = hook.params.payload.id
}

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [attachUserId],
    update: [],
    patch: [attachSolverId],
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
    patch: [],
    remove: []
  }
}
