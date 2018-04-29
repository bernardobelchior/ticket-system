const path = require('path')
const pug = require('pug')

module.exports = function (app) {
  const templatePath = path.join(
    __dirname,
    'email-templates',
    'ticket-answered.pug'
  )

  function getOwnURL (path, ticketId) {
    const baseUrl = process.env.WEBSITE_BASE_URL

    return `${baseUrl}/${path}/${ticketId}`
  }

  function notifier (type, ticket, to) {
    let compiledHTML = pug.compileFile(templatePath)({
      logo: '',
      ticketTitle: ticket.title,
      ticketLink: getOwnURL('#/tickets/show', ticket.id)
    })

    const email = {
      from: process.env.GMAIL,
      to: to,
      subject: '[Ticket System] Ticket Answered',
      html: compiledHTML
    }

    sendEmail(email)
  }

  function sendEmail (email) {
    return app
      .service('emails')
      .create(email)
  }

  return {notifier}
}
