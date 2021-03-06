const express = require('express');
const BagsService = require('./bags-service');
const { requireAuth } = require('../middleware/jwt-auth');
const bagsRouter = express.Router();
const jsonBodyParser = express.json();

bagsRouter.route('/').get(requireAuth, (req, res, next) => {
  BagsService.getUserBags(req.app.get('db'), req.user.id)
    .then(bags => {
      res.json(bags);
    })
    .catch(next);
});

bagsRouter
  .route('/:bag_id')
  .get(requireAuth, (req, res) => {
    BagsService.getBagItems(req.app.get('db'), `${req.params.bag_id}`).then(
      bag => {
        return res.json(bag);
      }
    );
  })
  .delete(requireAuth, (req, res, next) => {
    BagsService.deleteBag(req.app.get('db'), req.params.bag_id)
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(requireAuth, jsonBodyParser, (req, res, next) => {
    BagsService.updateBagItem(
      req.app.get('db'),
      req.body.item_id,
      req.params.bag_id,
      req.body.owned
    ).then(response => {
      if (response) {
        return res.status(204).end();
      } else {
        return res.status(400, {
          error: 'Update failed'
        });
      }
    });
  });

module.exports = bagsRouter;
