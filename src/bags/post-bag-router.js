//--- Dependencies
const express = require('express');
const BagsService = require('./bags-service');
const { requireAuth } = require('../middleware/jwt-auth');
const postBagsRouter = express.Router();
const jsonBodyParser = express.json();


//--- This is a post route for creating a new bag. This happens in 3 parts. "create a bag", " populate the bag with items based on the situation selected", and then populate those items into the new bag_id.
postBagsRouter
    .post('/', requireAuth, jsonBodyParser, (req, res, next) => {

        const user_id = req.user.id;
        const situation = req.body.situations;

        BagsService.createNewBag(
            req.app.get('db'),
            req.body.bag_name,
            user_id)
            .then(bag => {
                let bag_id = bag;
                BagsService.getSituationItems(
                    req.app.get('db'),
                    situation
                )
                    .then(items => {
            //--- This is incase there is a error in the promise chain we've created. The next step in the promise chain iterates over the items in the database and if they match the selected situation it inserts it into the 'bag_items' table.
                        let statusBool = true;
                        items.map(item => {
                            return BagsService.insertSituationItems(
                                req.app.get('db'),
                                item.id,
                                user_id,
                                bag_id
                            )
                                .then(res => {
                                    if (!res) {
                                        statusBool = false;
                                    }
                                });
                        });
            //--- Returns the location path of the new bag for a bag-home/:bag_id route.
                        if (statusBool) {
                            return res.status(201).location(`https://secret-peak-79739.herokuapp.com/bag-home/${bag_id}`).json({ bag_id: bag_id });
                        } else {
                            return res.status(500).end();
                        }
                    });
            })
            .catch(err => err.message);
    });
module.exports = postBagsRouter;