const app = require('../src/app');

describe('App Testing Suite', () => {
  it('GET / responds with 200 containing "Hello, world"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello, world');
  });
});