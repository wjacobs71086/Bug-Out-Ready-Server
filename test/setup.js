process.env.TZ = 'UCT';
process.env.JWT_SECRET = '1Forrest1';

const { expect } = require( 'chai' );
const supertest = require( 'supertest' );

global.expect = expect;
global.supertest = supertest;



// 
// process.env.NODE_ENV = 'test';
// 

// require('dotenv').config();

// process.env.TEST_DB_URL = process.env.TEST_DB_URL
//   || "postgresql://dunder_mifflin:password-jim@localhost/blogful-auth-test";

// const { expect } = require('chai');
// const supertest = require('supertest');

// global.expect = expect;
// global.supertest = supertest;