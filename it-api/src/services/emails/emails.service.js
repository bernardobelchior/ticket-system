// Initializes the `emails` service on path `/emails`
const hooks = require('./emails.hooks')
const Mailer = require('feathers-mailer')
const smtpTransport = require('nodemailer-smtp-transport')

module.exports = function (app) {
  app.use(
    '/emails',
    Mailer(
      smtpTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL,
          pass: process.env.GMAIL_PASSWORD
        }
      })
    )
  )

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('emails')

  service.hooks(hooks)
}
