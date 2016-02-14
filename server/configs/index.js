"use strict";

module.exports = function(app){
    var DEFAULT_ENV = 'dev';

    var env = DEFAULT_ENV;

    app.use(require('morgan')('dev'));
    
    app.configs = require('./' + env);

    app.errors  = require('./errors');
};