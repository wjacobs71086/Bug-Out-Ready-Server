const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const AuthService = {
  getUserWithUserName(db, user_name) {
    return db('bugout_users')
      .where({ user_name })
      .first();
  },
  parseBasicToken(token) {
    return Buffer
      .from(token, 'base64')
      .toString()
      .split(':');
  },
  comparePasswords(password, hash){
    return bcrypt.compare(password, hash);
  },
  createJwt(subject, payload) {
    return jwt.sign(payload, config.JWT_SECRET, {
      subject,
      algorithm: 'HS256',
    });
  },
  verifyJwt(token) {
    return jwt.verify(token, config.JWT_SECRET, {
      algorithms: ['HS256'],
    });
  },
  addUser(db, user_name, password) {
    password = `${bcrypt.hash(password, 10).then(hash => hash)}`;
    return db('bugout_users')
      .insert({
        user_name: user_name,
        password: password
      });
  }
};

module.exports = AuthService;