"use strict";

var mongoose = require('mongoose');

module.exports = function(app){
    app.mongoose = mongoose.connect(app.configs.database.uri);

    app.models                      = {};
    app.models.User                 = require('./User')(app);
    app.models.Category             = require('./Category')(app);
    app.models.Event                = require('./Event')(app);
    app.models.OAuthClient          = require('./OAuthClient')(app);
    app.models.OAuthRefreshToken    = require('./OAuthRefreshToken')(app);
    app.models.OAuthAccessToken     = require('./OAuthAccessToken')(app);
};