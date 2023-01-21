const express = require('express');
const BagsService = require('./bags-service');
const { requireAuth } = require('../middleware/jwt-auth');
const postBagsRouter = express.Router();
const jsonBodyParser = express.json();


postBagsRouter
    .post('/', requireAuth, jsonBodyParser, async (req, res, next) => {

        const user_id = req.user.id;
        const situation = req.body.situations;
        const db = req.app.get('db');

        try {
            const newBag = await BagsService.createNewBag(db, req.body.bag_name, user_id);
            const situationItems = await BagsService.getSituationItems(db, situation);
            if (situationItems) {
                situationItems.forEach(async (item) => {
                    await BagsService.insertSituationItems(db, item.id, user_id, newBag.bag_id)
                });
                return res.status(201).json({ bag_id: newBag.bag_id })
            }
        } catch (error) {
            console.log('error found');
            console.log({ error })
        }
    });
module.exports = postBagsRouter;