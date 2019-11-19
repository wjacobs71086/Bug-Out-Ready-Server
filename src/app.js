require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const authRouter = require('../src/auth/auth-router');
const itemsRouter = require('../src/items/items-router');
const bagsRouter = require('../src/bags/bags-router');
const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

  app.use(morgan(morganOption));
  app.use(helmet());
  app.use(cors());


  // app.get('/', (req,res) => {
  //   res.send('Hello, world');
  // });

  app.use('/api/auth', authRouter);
  app.use('/items', itemsRouter);
  app.use('/bag-home', bagsRouter);
  app.use('/bags', bagsRouter);

  app.use(function errorHandler(error,req,res,next) {
    let response;
    if (NODE_ENV === 'production') {
      response = { error: { message: 'server error' } };
    } else {
      console.error(error);
      response = { message: error.message };
    }
    res.status(500).json(response);
  });


  module.exports = app;