const authentication = require('@feathersjs/authentication')
const jwt = require('@feathersjs/authentication-jwt')
const local = require('@feathersjs/authentication-local')
const bcrypt = require('bcryptjs')

module.exports = function (app) {
  const config = app.get('authentication')

  class CustomVerifier extends local.Verifier {
    // The verify function has the exact same inputs and
    // return values as a vanilla passport strategy
    async verify (req, username, password, done) {
      // do your custom stuff. You can call internal Verifier methods
      // and reference this.app and this.options. This method must be implemented.

      let loginQuery
      if (req.body.entity === 'user') {
        loginQuery = await app.service('users').find({
          query: {
            email: username
          }
        })
      } else {
        loginQuery = await app.service('solvers').find({
          query: {
            email: username
          }
        })
      }

      let success, payload
      if (loginQuery.total === 1) {
        success = await bcrypt.compare(password, loginQuery.data[0].password)
        if (success) {
          payload = {
            id: loginQuery.data[0].id,
            deptId: loginQuery.data[0].departmentId
          }
        }
      } else {
        success = false
        payload = 'Login Error'
      }

      // the 'user' variable can be any truthy value
      // the 'payload' is the payload for the JWT access token that is generated after successful authentication
      done(null, success, payload)
    }
  }

  // Set up authentication with the secret
  app.configure(authentication(config))
  app.configure(jwt())
  app.configure(local())

  app.configure(local({Verifier: CustomVerifier}))

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    before: {
      create: [
        authentication.hooks.authenticate(config.strategies)
      ],
      remove: [
        authentication.hooks.authenticate('jwt')
      ]
    }
  })
}
