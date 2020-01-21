module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgres://twbcshaowyjnhx:3befd1525bd724efd59303494204fd0a55867691c30eeefbadf7b94662b6099e@ec2-54-197-238-238.compute-1.amazonaws.com:5432/d8ue0mkf7e1lvg',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://bugout@localhost/bugout-test',
    JWT_SECRET: process.env.JWT_SECRET || 'Change-this-secret',
};