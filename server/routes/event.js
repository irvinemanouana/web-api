"use strict";

var router      = require('express').Router(),
    bodyparser  = require('body-parser').json(),
    multer      = require('multer'),
    storage     = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname.concat('/../../uploads/event'));
        },
        filename: function (req, file, cb) {
            var eventId     = req.params.id,
                splitName   = file.originalname.split('.'),
                extension   = '.'.concat(splitName[splitName.length - 1]),
                filename    = file.fieldname.concat('-', eventId, extension);

            cb(null, filename);
        }
    }),
    upload      = multer({ storage : storage });

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

    router.post('/:id/icon',
        app.middlewares.authenticated,
        upload.single('event'),
        app.actions.event.uploadIcon
    );

/*
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