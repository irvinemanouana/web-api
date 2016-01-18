"use strict";

var router = require('express').Router();
var bodyparser = require('body-parser').json();

module.exports = function(app){

    router.post('',
        bodyparser,
        app.middlewares.authenticated,
        app.actions.event.create
    );

    router.get('/all',
        app.middlewares.authenticated,
        app.actions.event.list
    );

    router.get('/:id',
        app.middlewares.authenticated,
        app.actions.event.show
    );

    router.put('/:id',
        bodyparser,
        app.middlewares.authenticated,
        app.actions.event.update
    );

    router.delete('/:id',
        app.middlewares.authenticated,
        app.actions.event.remove
    );

/*
    router.post('/:id/icon',
        app.middlewares.authenticated,
        app.actions.event.uploadIcon
    );

    router.get('/:id/icon',
        app.middlewares.authenticated,
        app.actions.event.showIcon
    );

    router.post('/:id/subscribe/:user',
        app.middlewares.authenticated,
        app.actions.event.subscribe
    );

    router.delete('/:id/unsubscribe/:user',
        app.middlewares.authenticated,
        app.actions.event.unsubscribe
    );
*/

    return router;
};