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

const removeTicketsNotAssignedToSolver = hook => {
  hook.result.data = hook.result.data.filter(ticket => ticket.state !== 'solved' && (ticket.state === 'unassigned' || ticket.solverId === hook.params.payload.id))

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

const expandUser = hook => {
  return hook.app.service('users').get(hook.result.userId)
    .then(user => {
      hook.result.user = user
    })
}

const expandSecondaryQuestions = hook => {
  return hook.app.service('secondary-questions').find({
    query: {
        ticketId: hook.result.id
    }
  }).then(result => {
    hook.result.secondaryQuestions = result
  })
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
    find: [
      removeTicketsNotAssignedToSolver
    ],
    get: [expandSecondaryQuestions, expandUser],
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
