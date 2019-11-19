const express = require('express');
const authRouter = express.Router();
const AuthService = require('./auth-service');
const jsonBodyParser = express.json();

authRouter 
    .post('/login',jsonBodyParser, (req,res,next) => {
        const { user_name, password } = req.body;
        const loginUser = { user_name, password };

        for (const [key, value] of Object.entries(loginUser))
            if(value == null)
                return res.status(400).json({
                    error: `Missing ${key} in request body`
                });

        AuthService.getUserWithUserName(
            req.app.get('db'),
            loginUser.user_name
        )
            .then(dbUser => {
                if(!dbUser)
                    return res.status(400).json({ 
                        error: 'Incorrect user_name',
                    });
        AuthService.comparePasswords(loginUser.password, dbUser.password)
                    .then(compareMatch => {
                        if(!compareMatch)
                            return res.status(400).json({ 
                                error: 'Incorrect password'
                            });
                        const sub = dbUser.user_name;
                        const payload = { user_id: dbUser.id };
                        
                        res.send({
                            authToken: AuthService.createJwt(sub, payload),
                            user_id: dbUser.id,
                        });
                    });
            })
            .catch(next);
        
    });

    authRouter 
    .post('/sign-up',jsonBodyParser, (req,res,next) => {
        const { user_name, password } = req.body;
        const loginUser = { user_name, password };
        console.log('signing up');
        for (const [key, value] of Object.entries(loginUser))
            if(value == null)
                return res.status(400).json({
                    error: `Missing ${key} in request body`
                });
        AuthService.addUser(req.app.get('db'), user_name, password)
            .then(result => {
                console.log('succession');
                return res.status(201).json({
                        message:'user created'
                    });
            }).catch(next => {
                console.log('failed');
                //next();
            });
    });


module.exports = authRouter;