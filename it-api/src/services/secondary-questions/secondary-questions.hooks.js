const {authenticate} = require('@feathersjs/authentication').hooks

const notifyOtherDept = async context => {

  let rsmq = context.app.get('rsmq')

  let secondaryQuestion = {
    title: context.data.title,
    description: context.data.description,
    state: context.data.state,
    ticketId: context.data.ticketId
  }

  console.log('Going to create')

  rsmq.sendMessage({qname:"others", message: JSON.stringify(secondaryQuestion)}, function (err, resp) {
    if (resp) {
        console.log("Message sent. ID:", resp)
    }
    console.log(resp)
    console.log(err)
  })
}

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
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
