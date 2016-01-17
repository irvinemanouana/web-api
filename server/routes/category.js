"use strict";

var router = require('express').Router();
var bodyparser = require('body-parser').json();

module.exports = function(app){

    router.post('',
        bodyparser,
        app.middlewares.authenticated,
        app.actions.category.create
    );

    router.get('/all',
        app.actions.category.list
    );

    router.get('/:id',
        app.actions.category.show
    );

/*
    router.put('/:id',
        bodyparser,
        app.middlewares.authenticated,
        app.actions.category.update
    );

    router.delete('/:id',
        app.middlewares.authenticated,
        app.actions.category.remove
    );
*/

    return router;
};