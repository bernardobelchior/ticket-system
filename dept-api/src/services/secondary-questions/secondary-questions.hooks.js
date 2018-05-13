const {
  authenticate
} = require('@feathersjs/authentication').hooks
const {
  iff
} = require('feathers-hooks-common')

const isState = state => hook => {
  return hook.data.state === state
}

const attachUserId = hook => {
  hook.data.userId = hook.params.payload.userId
}

const checkForNewQuestions = context => {
  popMessage()
}

function popMessage() {
  rsmq.popMessage({
    qname: 'others'
  }, function (err, resp) {
    if (resp.id) {
      console.log('Message received.', resp)
      let obj = JSON.parse(resp.message)
      app.service('secondary-questions').create({
        title: obj.title,
        description: obj.description,
        state: obj.state,
        ticketId: obj.ticketId,
        userId: 1
      })
      popMessage()
    } else {
      console.log('No messages for me...')
    }
  });
}

//TODO: 
const sendToIT = hook => {
  throw new Error('Unimplemented')
}

module.exports = {
  before: {
    all: [authenticate('jwt'), checkForNewQuestions],
    find: [checkForNewQuestions],
    get: [checkForNewQuestions],
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
