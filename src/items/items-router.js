// This is intended to support finding specific items but is currently un-used. 

const express = require('express');
const ItemsService = require('./items-service');
const BagsService = require('../bags/bags-service');
const { requireAuth } = require('../middleware/jwt-auth');
const jsonBodyParser = express.json();

const itemsRouter = express.Router();


itemsRouter
.route('/')
.post(requireAuth, jsonBodyParser, (req, res, next) => {
  const user_id = req.user.id;
  ItemsService.createNewBagItem(
    req.app.get('db'),
    req.body.item_name,
    req.body.url,
    req.body.img,
    req.body.description,
    req.body.est_cost
  )
  .then(item => {
    return BagsService.insertSituationItems(
      req.app.get('db'),
      item.id,
      user_id,
      req.body.bag_id
    );
}).then(response => {
  if (response) {
    return res.status(201);
  } else {
    return res.status(400, {
      error: 'Create item failed'
    });
  }
}).catch(next)
})

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