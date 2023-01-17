/* eslint-disable quotes */
require('dotenv').config();

module.exports = {
    "migrationsDirectory": __dirname + '/migrations',
    "driver": "pg",
    "database": process.env.TEST_DATABASE_URL,
    "connectionString": (process.env.NODE_ENV === 'test')
        ? process.env.TEST_DATABASE_URL
        : process.env.DATABASE_URL,
    "ssl": !!process.env.SSL,
};