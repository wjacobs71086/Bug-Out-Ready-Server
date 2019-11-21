const express = require('express');
const BagsService = require('./bags-service');
const { requireAuth } = require('../middleware/jwt-auth');
const bagsRouter = express.Router();
const jsonBodyParser = express.json();




bagsRouter
.route('/')
.post(requireAuth, jsonBodyParser, (req,res,next) => {
  const  bag_name  = req.body.bag_name;
  //console.log('this is the bag_name', bag_name)
  const user_id = req.user.id;
  //console.log('this is the user ID', user_id)
  const situation = req.body.situations;
  let db = req.app.get('db');
  //let bag_id = req.body.bag_name;

  async function main() {
    //let bag_id;
    const bag = await BagsService.createNewBag(
      db,
      bag_name,
      user_id
    );

   // console.log(bag);
    const itemsList = await BagsService.getSituationItems(
      db,
      situation,
    );
    //console.log(itemsList);
    try {
      const insertItems = await BagsService.insertSituationItems(
        db,
        itemsList,
        user_id,
        bag
      );
    } catch(e) {
      // console.log(e);
      // console.error(e);
    }
  };

  main();
  next();

  // BagsService.createNewBag(
  //   req.app.get('db'),
  //   req.body.bag_name, 
  //   user_id)
  //   .then(bag => {
  //     let bag_id = bag;

  //     BagsService.getSituationItems(
  //     req.app.get('db'),
  //     situation
  //   ).then(items => res.json(items));
  //     //console.log('this is the bag_id',bag_id);
  //     return [items, bag_id];
  // })
  //   .then(items => {
  //     let bag_id = items[1];
  //     let itemsList = items[0];
  //     //console.log('itemsList', itemsList);
  //     //console.log('user_id in promise chain', user_id);
  //    return  BagsService.insertSituationItems(
  //       req.app.get('db'),
  //       itemsList,
  //       user_id,
  //       bag_id
  //     );
  //     //console.log(items);
  //     //return res.json(items);
  //   })
  //   .catch(err => console.log(err.message));


});




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




  module.exports = bagsRouter;




 