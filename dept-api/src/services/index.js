const users = require('./users/users.service.js');
const secondaryQuestions = require('./secondary-questions/secondary-questions.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(secondaryQuestions);
};
