"use strict";

var router = require('express').Router();
var bodyparser = require('body-parser').urlencoded({ extended: true });

module.exports = function(app){

    /**
     * @api {ALL} /oauth/token Authentication
     * @apiName Authentication
     * @apiGroup OAuth2
     *
     * @apiVersion 1.0.0
     *
     * @apiDescription OAuth2.
     */
    router.all('/token', bodyparser, app.oauth.grant());

    return router;
};