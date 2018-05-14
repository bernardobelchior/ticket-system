const axios = require('axios')
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
  popMessage(context)
}

function popMessage(context) {
  rsmq.popMessage({
    qname: 'others'
  }, function (err, resp) {
    if (resp.id) {
      console.log('Message received.', resp)
      let obj = JSON.parse(resp.message)
      context.app.service('secondary-questions').create({
        title: obj.title,
        description: obj.description,
        state: 'waiting_for_answers',
        ticketId: obj.ticketId,
        userId: 1
      })
      popMessage()
    } else {
      console.log('No messages for me...')
    }
  });
}

const sendToIT = hook => {
  return axios.patch(`${hook.app.get('it-address')}/secondary-questions/${hook.result.id}`, {
    answer: hook.result.answer,
    state: 'solved'
  })
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
    patch: [
      sendToIT
    ],
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
