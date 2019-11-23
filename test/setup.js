process.env.TZ = 'UCT';
process.env.JWT_SECRET = '1Forrest1';
process.env.NODE_ENV='test';

require('dotenv').config();

const { expect } = require( 'chai' );
const supertest = require( 'supertest' );


// eslint-disable-next-line quotes
process.env.TEST_DB_URL= process.env.TEST_DB_URL || "postgresql://wesleyjacobs@localhost/bugout-test";

global.expect = expect;
global.supertest = supertest;
