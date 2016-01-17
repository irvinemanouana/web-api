"use strict";

var router      = require('express').Router(),
    bodyparser  = require('body-parser').json(),
    multer      = require('multer'),
    storage     = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname.concat('/../../uploads/avatar'));
        },
        filename: function (req, file, cb) {
            var userId      = req.session.userId,
                splitName   = file.originalname.split('.'),
                extension   = '.'.concat(splitName[splitName.length - 1]),
                filename    = file.fieldname.concat('-', userId, extension);

            cb(null, filename);
        }
    }),
    upload      = multer({ storage : storage });

module.exports  = function(app){

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

    router.delete('',
        app.middlewares.authenticated,
        app.actions.user.remove
    );

    router.post('/avatar',
        app.middlewares.authenticated,
        upload.single('avatar'),
        app.actions.user.uploadAvatar
    );

/*
    router.post('/avatar',
        app.middlewares.authenticated,
        app.actions.user.showAvatar
    );
*/
    return router;
};