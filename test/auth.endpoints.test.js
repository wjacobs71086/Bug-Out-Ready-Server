/* eslint-disable quotes */
const app = require('../src/app');
const knex = require('knex');
const helpers = require('./test.fixtures');
const jwt = require('jsonwebtoken');

describe('AUTH ENDPOINTS', () => {
    let db;
    const { testUsers } = helpers.makeBagFixtures();
    const testUser = testUsers[0];

    before('Make the Knex Instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        });
        app.set('db', db);
    });

    after('Disconnect from the DataBase', () => db.destroy());
    before('Cleanup', () => helpers.cleanTables(db));
    afterEach('Cleanup', () => helpers.cleanTables(db));

    describe(`POST /api/auth/login`, () => {

        beforeEach(`insert users`, () => helpers.seedUsers(db,testUsers));
        const requiredFields = ['user_name', 'password'];

        requiredFields.forEach(field => {
            const loginAttemptBody = {
                user_name: testUser.user_name,
                password: testUser.password,
            };

        it(`Responds with 400 required error when ${field} is missing`, () => {
            delete loginAttemptBody[field];
            return supertest(app)
                .post(`/api/auth/login`)
                .send(loginAttemptBody)
                .expect(400, {error: `Missing ${field} in request body`});
        });
        });
   
        it(`responds 400 'invalid user_name or password' when bad user_name`, () => {
            const userInvalidUser = { user_name: 'user-not', password: 'existy' };
            return supertest(app)
                .post('/api/auth/login')
                .send(userInvalidUser)
                .expect(400, {error : 'Incorrect user_name or password'});
        });

        it(`responds 401 'invalid user_name or password' when bad password`, () => {
            const userInvalidPassword = { user_name: testUser.user_name, password: 'invalid'};
            return supertest(app)
                .post('/api/auth/login')
                .send(userInvalidPassword)
                .expect(400, {error: `Incorrect user_name or password`});
        });

        it.skip(`responds 200 and JWT auth token using secret when valid credentials`, () => {
            const userValidCredentials = {
                user_name: testUser.user_name,
                password: testUser.password,
            };
            const expectedToken = jwt.sign(
                { user_id: testUsers.id},
                process.env.JWT_SECRET,
                {
                    subject: testUser.user_name,
                    algorithm: 'HS256',
                }
            );
           console.log('this is the expected token',expectedToken);
            return supertest(app)
                .post('/api/auth/login')
                .send(userValidCredentials)
                .expect(200, {
                    authToken: expectedToken,
                    user_id: 1,
                });
        });

    });

});