"use strict";

var oauthserver     = require('oauth2-server');

module.exports = function(app){

    app.middlewares                     = {};
    app.middlewares.oauthHandler        = require('./oauthHandler')(app);
    app.middlewares.clientErrorHandler  = require('./clientErrorHandler')(app);

    app.oauth = oauthserver({
        model: app.middlewares.oauthHandler,
        grants: ['password', 'refresh_token'],
        debug: true
    });
};