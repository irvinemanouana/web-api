"use strict";

var router = require('express').Router();
var bodyparser = require('body-parser').urlencoded({ extended: true });

module.exports = function(app){

    router.all('/token', bodyparser, app.oauth.grant());

    return router;
};