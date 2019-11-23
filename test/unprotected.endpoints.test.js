const app = require('../src/app');

describe('Unprotected Endpoint Testing Suite', () => {
        it('Splash page loads', () => {
            return supertest(app)
                .get('/')
                .expect(200);
        });
});