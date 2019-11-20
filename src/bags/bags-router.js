const express = require('express');
const BagsService = require('./bags-service');
const { requireAuth } = require('../middleware/jwt-auth');
const bagsRouter = express.Router();
const jsonBodyParser = express.json();

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
    console.log('getBagItems is being called', req.params.bag_id);
      BagsService.getBagItems(req.app.get('db'), `${req.params.bag_id}`)
      .then(bag => res.json(bag));
  });

  bagsRouter
    .route('/')
    .post(requireAuth, jsonBodyParser, (req,res,next) => {
      //const  bag_name  = req.body.bag_name;
      const user_id = req.user.id;
      const situation = req.body.situations;
      
      console.log(req.body);
      BagsService.createNewBag(req.app.get('db'), req.body.bag_name, user_id)
        .then(result => {
          let newBagId = `${result}`;
          BagsService.fillBagWithItems(
                  req.app.get('db'),
                  newBagId,
                  user_id,
                  situation
                );
          return res.status(201).json({
            message: 'bag created'
          });
        }).catch(err => console.log(err.message));
});



  module.exports = bagsRouter;