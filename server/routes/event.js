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
        app.oauth.authorise(),
        app.actions.event.create
    );

    router.get('/all',
        app.oauth.authorise(),
        app.actions.event.list
    );

    router.get('/:id',
        app.oauth.authorise(),
        app.actions.event.show
    );

    router.put('/:id',
        bodyparser,
        app.oauth.authorise(),
        app.actions.event.update
    );

    router.delete('/:id',
        app.oauth.authorise(),
        app.actions.event.remove
    );

    router.post('/:id/icon',
        app.oauth.authorise(),
        upload.single('event'),
        app.actions.event.uploadIcon
    );

    router.get('/:id/icon',
        app.actions.event.showIcon
    );

    router.post('/:id/subscribe/:user',
        app.oauth.authorise(),
        app.actions.event.subscribe
    );

    router.delete('/:id/unsubscribe/:user',
        app.oauth.authorise(),
        app.actions.event.unsubscribe
    );

    return router;
};