const axios = require('axios')
const {
  authenticate
} = require('@feathersjs/authentication').hooks
const {
  iff
} = require('feathers-hooks-common')
const serverToken = '3DF1A7FF-F69D-9545-7EE1-43CE710EA0F1'

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
        userId: 1,
        originalId: obj.originalId
      })
      popMessage(context)
    } else {
      console.log('No messages for me...')
    }
  });
}

const sendToIT = hook => {
  console.log(hook.result)
  console.log('boas')
  return axios.patch(`${hook.app.get('it-address')}/secondary-questions/${hook.result.originalId}`, {
    answer: hook.result.answer,
    state: 'solved',
    token: serverToken
  }).then(() => hook)
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
      iff(
        isState('solved'),
        sendToIT
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
