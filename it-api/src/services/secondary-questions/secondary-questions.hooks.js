const {authenticate} = require('@feathersjs/authentication').hooks

const notifyOtherDept = async context => {

  let rsmq = context.app.get('rsmq')

  rsmq.sendMessage({qname:"others", message:"Batard"}, function (err, resp) {
    if (resp) {
        console.log("Message sent. ID:", resp)
    }
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
