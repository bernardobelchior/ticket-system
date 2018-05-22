const {authenticate} = require('@feathersjs/authentication').hooks
const {unless} = require('feathers-hooks-common')
const {verifyServerToken} = require('../common-hooks.js')

const notifyOtherDept = async context => {
  return context.app.service('tickets').get(context.result.ticketId).then(ticket => {
    return context.app.service('solvers').get(context.params.payload.id).then(solver => {
      let rsmq = context.app.get('rsmq')

      let secondaryQuestion = {
        originalId: context.result.id,
        title: context.result.title,
        description: context.result.description,
        state: context.result.state,
        ticketId: context.result.ticketId,
        ticketTitle: ticket.title,
        ticketDescription: ticket.description,
        creatorName: solver.name
      }

      rsmq.sendMessage({qname:"others", message: JSON.stringify(secondaryQuestion)}, function (err, resp) {
        if (resp) {
          console.log("Message sent. ID:", resp)
          console.log(resp)
        }
        else {
          console.log(err)
        }
      })
    })
  })
}

const updateTicketState = context => {
  return context.app.service('secondary-questions').find({
    query: {
      ticketId: context.result.ticketId
    }
  }).then(results => {
    console.log(results)
    console.log(results.data.filter(question => question.state !== 'solved'))
    if (results.data.filter(question => question.state !== 'solved').length === 0) {
      return context.app.service('tickets').patch(context.result.ticketId, {
        state: 'assigned',
        token: context.data.token
      }).then(() => {
        return context 
      })
    } else {
      return context
    }
  })
}

module.exports = {
  before: {
    all: [
      unless(
        verifyServerToken,
        authenticate('jwt')
      )
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [
    ],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [notifyOtherDept],
    update: [],
    patch: [updateTicketState],
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
