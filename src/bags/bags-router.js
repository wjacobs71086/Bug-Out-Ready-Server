const express = require('express');
const BagsService = require('./bags-service');
const { requireAuth } = require('../middleware/jwt-auth');
const bagsRouter = express.Router();



bagsRouter
  .route('/')
  .get(requireAuth, (req, res, next) => {
    console.log(req.user.id);
    BagsService.getUserBags(req.app.get('db'), req.user.id)
      .then(bags => {
        res.json(bags);
      })
      .catch(next);
  });

bagsRouter
  .route('/:bag_id')
  .get(requireAuth, (req, res) => {
    //console.log('getBagItems is being called', req.params.bag_id);
    BagsService.getBagItems(req.app.get('db'), `${req.params.bag_id}`)
      .then(bag => res.json(bag));
  });



bagsRouter
  .route('/:bag_id')
  .delete(requireAuth, (req, res, next) => {
    console.log(req.params.bag_id);
    BagsService.deleteBag(
      req.app.get('db'),
      req.params.bag_id
    )
      .then(res => {
        //console.log('is this working??', res);
        if (!res) {
          console.log('this is bad news');
        } else {
          return console.log('its been deleted');
        }
      });
  });

module.exports = bagsRouter;




