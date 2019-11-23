const app = require('../src/app');
const knex = require('knex');
const helpers = require('./test.fixtures');

describe('App Testing Suite', () => {
  it('GET / responds with 200', () => {
    return supertest(app)
      .get('/')
      .expect(200);
  });
});