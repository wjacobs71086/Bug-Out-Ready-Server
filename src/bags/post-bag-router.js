const express = require('express');
const BagsService = require('./bags-service');
const { requireAuth } = require('../middleware/jwt-auth');
const postBagsRouter = express.Router();
const jsonBodyParser = express.json();

postBagsRouter
    .post('/', requireAuth, jsonBodyParser, (req, res, next) => {
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
                BagsService.getSituationItems(
                    req.app.get('db'),
                    situation
                )
                    .then(items => {
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

                        if (statusBool) {
                            //TODO: Set this to the depolyed endpoint variable
                            return res.status(201).location(`localhost:3000/bag-home/${bag_id}`).json({ bag_id: bag_id });
                        } else {
                            return res.status(500).end();
                        }
                    });
            })
            .catch(err => err.message);
    });
module.exports = postBagsRouter;