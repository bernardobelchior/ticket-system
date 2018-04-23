const assert = require('assert');
const app = require('../../src/app');

describe('\'secondary-questions\' service', () => {
  it('registered the service', () => {
    const service = app.service('secondary-questions');

    assert.ok(service, 'Registered the service');
  });
});
