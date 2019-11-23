/* eslint-disable quotes */
/* eslint-disable semi */
const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test.fixtures');

describe('Protected endpoints', function () {
    let db

    const {
        testUsers,
        testBags,
        testItems,
        testBagItems
    } = helpers.makeBagFixtures()

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))

    beforeEach('insert items', () =>
        helpers.seedBagsTables(
            db,
            testUsers,
            testItems,
            testBags,
            testBagItems
        )
    );

    const protectedEndpoints = [
        {
            name: 'GET /bags',
            path: `/bags`,
            method: supertest(app).get,
        },
        {
            name: 'GET /bag-home/:bag_id',
            path: `/bag-home/:bag_id`,
            method: supertest(app).get,
        },
        {
            name: 'POST /situations',
            path: `/situations`,
            method: supertest(app).post,
        },
    ];

    protectedEndpoints.forEach(endpoint => {
        describe(endpoint.name, () => {
            it(`responds 401 'Missing bearer token' when no basic token`, () => {
                return endpoint.method(endpoint.path)
                    .expect(401, {
                        error: `Missing bearer token`
                    })
            });
            it(`responds 401 'Unauthorized request' when invalid JWT secret`, () => {
                const validUser = testUsers[0];
                const invalidSecret = 'not-so-secret';
                return endpoint.method(endpoint.path)
                    .set('Authorization',
                        helpers.makeAuthHeader(validUser, invalidSecret))
                    .expect(401, {
                        error: `Unauthorized request`
                    });
            });
            it(`responds 401 'Unauthorized request' when invalid sub in payload`, () => {
                const invalidUser = { user_name: 'user-doesnt-exist', id: 1 };
                return endpoint.method(endpoint.path)
                    .set('Authorization', helpers.makeAuthHeader(invalidUser))
                    .expect(401, {
                        error: `Unauthorized request`
                    });
            });

        });

    })



});
