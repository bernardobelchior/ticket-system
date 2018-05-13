const redisMQ = require('rsmq')

module.exports = function (app) {
  rsmq = new redisMQ({
    host: "127.0.0.1",
    port: 6379,
    ns: "rsmq"
  });

  rsmq.listQueues(function (err, queues) {
    if (err) {
      console.error(err)
      return
    }
    console.log("Active queues: " + queues.join(","))
  });

  return rsmq;
}
