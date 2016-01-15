"use strict"

var session     = require('express-session'),
    MongoStore  = require('connect-mongo')(session);


module.exports = function(app){
    app.use(session({
        secret: app.configs.session.secret,
        saveUninitialized: false,
        resave: true,
        store: new MongoStore({
            url: app.configs.session.url,
            ttl: app.configs.session.ttl
        })
    }));
};