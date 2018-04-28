const {authenticate} = require('@feathersjs/authentication').hooks

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks

const getSolverDepartment = async context => {
  const itDept = await context.app.service('departments').find({
    name: 'IT'
  })

  context.data.departmentId = itDept.data[0].id
}

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [hashPassword(), getSolverDepartment],
    update: [hashPassword(), authenticate('jwt')],
    patch: [hashPassword(), authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
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
};
