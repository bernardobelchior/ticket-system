// Initializes the `secondary-questions` service on path `/secondary-questions`
const createService = require('feathers-sequelize')
const createModel = require('../../models/secondary-questions.model')
const hooks = require('./secondary-questions.hooks')

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    name: 'secondary-questions',
    Model,
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/secondary-questions', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('secondary-questions')

  service.hooks(hooks)
}
