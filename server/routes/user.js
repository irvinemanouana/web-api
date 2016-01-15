"use strict";

var router = require('express').Router();
var bodyparser = require('body-parser').json();

module.exports = function(app){

    router.post('',
        bodyparser,
        app.actions.user.create
    );

    router.get('',
        app.middlewares.authenticated,
        app.actions.user.show
    );

    router.put('',
        bodyparser,
        app.middlewares.authenticated,
        app.actions.user.update
    );

/*
    router.delete('',
        app.middlewares.authenticated,
        app.actions.user.remove
    );

    router.post('/avatar',
        app.middlewares.authenticated,
        app.actions.user.uploadAvatar
    );

    router.post('/avatar',
        app.middlewares.authenticated,
        app.actions.user.showAvatar
    );
*/
    return router;
};