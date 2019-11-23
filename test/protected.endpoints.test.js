/* eslint-disable quotes */
/* eslint-disable semi */
const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test.fixtures');

describe('Protected endpoints', function() {
  let db

  const {
    testUsers,
    testBags,
    testItems,
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
      testBags,
      testItems
    )
  );

    


});
