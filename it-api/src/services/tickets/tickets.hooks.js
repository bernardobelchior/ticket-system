const {authenticate} = require('@feathersjs/authentication').hooks
const {iff} = require('feathers-hooks-common')
const mailer = require('../../mailer')

const sendTicketAnsweredMail = async hook => {
  if (!hook.params.provider) {
    return hook
  }

  const ticket = hook.result
  const to = (await hook.app.service('users').get(hook.result.userId)).email

  mailer(hook.app).notifier('ticketAnswered', ticket, to)
  return hook
}

const isAnswer = hook => {
  return hook.data.answer
}

const attachUserId = hook => {
  hook.data.userId = hook.params.payload.id

  return hook
}

const attachSolverId = hook => {
  hook.data.solverId = hook.params.payload.id

  return hook
}

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [attachUserId],
    update: [],
    patch: [
      attachSolverId
    ],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [
      iff(isAnswer,
        sendTicketAnsweredMail
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
