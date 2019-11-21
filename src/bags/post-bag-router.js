const express = require('express');
const BagsService = require('./bags-service');
const { requireAuth } = require('../middleware/jwt-auth');
const postBagsRouter = express.Router();
const jsonBodyParser = express.json();

postBagsRouter
    .post('/', requireAuth, jsonBodyParser, (req, res, next) => {
        console.log('post route is being called');
        const bag_name = req.body.bag_name;
        const user_id = req.user.id;
        const situation = req.body.situations;
        let db = req.app.get('db');

        BagsService.createNewBag(
            req.app.get('db'),
            req.body.bag_name,
            user_id)
            .then(bag => {
                let bag_id = bag;
                //console.log('making it to get situation items');
                BagsService.getSituationItems(
                    req.app.get('db'),
                    situation
                )
                    .then(items => {
                        //console.log('made it past situations and about to start map');
                        let statusBool = true;
                        items.map(item => {
                            return BagsService.insertSituationItems(
                                req.app.get('db'),
                                item.id,
                                user_id,
                                bag_id
                            )
                                .then(res => {
                                    //console.log('is this working??', res);
                                    if (!res) {
                                        statusBool = false;
                                    }
                                });
                        });

                        if (statusBool) {
                            //TODO: Set this to the depolyed endpoint variable
                            //console.log('this is at the end of the post line supposedly happy path');
                            return res.status(201).location(`localhost:3000/bag-home/${bag_id}`).json({ bag_id: bag_id });
                        } else {
                            return res.status(500).end();
                        }
                    });
            })
            .catch(err => console.log(err.message));
    });
module.exports = postBagsRouter;