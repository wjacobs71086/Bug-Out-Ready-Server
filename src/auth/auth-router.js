// Required Components and dependencies. 
const express = require('express');
const authRouter = express.Router();
const AuthService = require('./auth-service');
const jsonBodyParser = express.json();


//-------- POST route to login for an existing User. 
authRouter
    .post('/login', jsonBodyParser, (req, res, next) => {
//-------- Pulls the user_name and password from the request body. 
        const { user_name, password } = req.body;

//-------- creates a user to be logged in from that body. 
        const loginUser = { user_name, password };

//-------- terates over the input to validate nothing is missing. 
        for (const [key, value] of Object.entries(loginUser))
            if (value == null)
                return res.status(400).json({
                    error: `Missing ${key} in request body`
                });

//-------- This uses the Service to get a user from the input user_name. 
        AuthService.getUserWithUserName(
            req.app.get('db'),
            loginUser.user_name
        )

//-------- With that username it verifies it exists in the database. 
            .then(dbUser => {
                if (!dbUser)
                    return res.status(400).json({
                        error: 'Incorrect user_name or password',
                    });

//-------- This verifies the password is matching the hashed password in the database. 
                AuthService.comparePasswords(loginUser.password, dbUser.password)
                    .then(compareMatch => {
                        if (!compareMatch)
                            return res.status(400).json({
                                error: 'Incorrect user_name or password'
                            });
//-------- This takes the retrieved and verified user_name and password and then sends it back as an authenticated JsonWebToken
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

//-------- This route does about the same but is used to create the user. 
authRouter
    .post('/sign-up', jsonBodyParser, (req, res, next) => {
        const { user_name, password } = req.body;
        const loginUser = { user_name, password };
        for (const [key, value] of Object.entries(loginUser))
            if (value == null)
                return res.status(400).json({
                    error: `Missing ${key} in request body`
                });
        AuthService.addUser(req.app.get('db'), user_name, password)
            .then(result => {
                return res.status(201).json({
                    message: 'user created'
                });
            }).catch(next => {
                return res.status(400, {
                    error: 'Create new user failed'
                });
            });
    });


module.exports = authRouter;