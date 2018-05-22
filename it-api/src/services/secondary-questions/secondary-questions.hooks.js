const {authenticate} = require('@feathersjs/authentication').hooks
const {unless} = require('feathers-hooks-common')

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
        }
        console.log(resp)
        console.log(err)
      })
    })
  })
}

const serverToken = '3DF1A7FF-F69D-9545-7EE1-43CE710EA0F1'

const verifyServerToken = context => {
  return context.data && context.data.token === serverToken 
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
