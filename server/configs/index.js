"use strict";

module.exports = function(app){
    var DEFAULT_ENV = 'dev';

    var env = DEFAULT_ENV;

    app.configs = require('./' + env);
    app.errors  = require('./errors');
    app.crypto  = require('crypto-js');
    app.utils   = require('./utils');
};