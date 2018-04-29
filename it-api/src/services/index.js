const users = require('./users/users.service.js')
const tickets = require('./tickets/tickets.service.js')
const secondaryQuestions = require('./secondary-questions/secondary-questions.service.js')
const departments = require('./departments/departments.service.js')
const solvers = require('./solvers/solvers.service.js')
const emails = require('./emails/emails.service.js')
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users)
  app.configure(tickets)
  app.configure(secondaryQuestions)
  app.configure(departments)
  app.configure(solvers)
  app.configure(emails)
}
