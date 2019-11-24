process.env.TZ = 'UCT';
process.env.JWT_SECRET = '1Forrest1';
process.env.NODE_ENV='test';

require('dotenv').config();

const { expect } = require( 'chai' );
const supertest = require( 'supertest' );


// eslint-disable-next-line quotes
process.env.TEST_DATABASE_URL= process.env.TEST_DATABASE_URL || " postgres://twbcshaowyjnhx:3befd1525bd724efd59303494204fd0a55867691c30eeefbadf7b94662b6099e@ec2-54-197-238-238.compute-1.amazonaws.com:5432/d8ue0mkf7e1lvg";

global.expect = expect;
global.supertest = supertest;
