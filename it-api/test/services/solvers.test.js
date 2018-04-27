const assert = require('assert');
const app = require('../../src/app');

describe('\'solvers\' service', () => {
  it('registered the service', () => {
    const service = app.service('solvers');

    assert.ok(service, 'Registered the service');
  });
});
