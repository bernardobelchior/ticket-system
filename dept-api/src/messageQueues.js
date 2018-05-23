const redisMQ = require('rsmq')
const RSMQWorker = require('rsmq-worker')

module.exports = async function (app) {
  rsmq = new redisMQ({
    host: "127.0.0.1",
    port: 6379,
    ns: "rsmq"
  });

  rsmq.listQueues((err, queues) => {
    if (err) {
      console.error(err)
      return
    }
    console.log("Active queues: " + queues.join(","))
  });

  var worker = new RSMQWorker('others', {rsmq: rsmq})

  let user = (await app.service('users').find()).data[0]

  worker.on('message', async (msg, next, msgId) => {
    console.log('Message received.', msg)
    let obj = JSON.parse(msg)
    await app.service('secondary-questions').create({
      ...obj,
      state: 'waiting_for_answers',
      userId: user.id,
    })

    rsmq.deleteMessage({qname: 'others', id: msgId}, (err, resp) => {
      if (resp === 1) {
        console.log('Message deleted')
      }
      else {
        console.log('Message not found')
      }
    })
  })

  worker.start()

  return rsmq;
}
