"use strict";

module.exports = function(app){
    app.actions = {};
    
    app.actions.auth        = require('./auth')(app);
    app.actions.user        = require('./user')(app);
    app.actions.category    = require('./category')(app);
    app.actions.event       = require('./event')(app);

};