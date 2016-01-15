"use strict";

var router = require('express').Router();
var bodyparser = require('body-parser').json();

module.exports = function(app){
    
    router.post('/login',
        bodyparser,
        app.actions.auth.login
    );

    router.post('/logout',
        bodyparser,
        app.middlewares.authenticated,
        app.actions.auth.logout
    );

    return router;
};