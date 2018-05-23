// Initializes the `solvers` service on path `/solvers`
const createService = require('feathers-sequelize');
const createModel = require('../../models/solvers.model');
const hooks = require('./solvers.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'solvers',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/solvers', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('solvers');

  service.hooks(hooks);
};
