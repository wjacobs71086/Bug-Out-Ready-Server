const express = require('express');
const BagsService = require('./bags-service');

const bagsRouter = express.Router();

bagsRouter
  .route('/')
  .get((req, res, next) => {
    BagsService.getAllBags(req.app.get('db'))
      .then(bags => {
        res.json(bags);
      })
      .catch(next);
  });

  bagsRouter
  .route('/:bag_id')
  .get((req, res) => {
      console.log(req.params.item_id);
      BagsService.getById(req.app.get('db'), `${req.params.bag_id}`)
      .then(bag => res.json(bag));
  });

  module.exports = bagsRouter;