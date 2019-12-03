// This is intended to support finding specific items but is currently un-used. 

const express = require('express');
const ItemsService = require('./items-service');

const itemsRouter = express.Router();

itemsRouter
  .route('/')
  .get((req, res, next) => {
    ItemsService.getAllItems(req.app.get('db'))
      .then(items => {
        res.json(items);
      })
      .catch(next);
  });

  itemsRouter
  .route('/:item_id')
  .get((req, res) => {
      ItemsService.getById(req.app.get('db'), `${req.params.item_id}`)
      .then(item => res.json(item));
  });

  module.exports = itemsRouter;