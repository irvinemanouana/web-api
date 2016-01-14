"use strict";

var mongoose = require('mongoose');

module.exports = function(app){
    app.mongoose = mongoose.connect(app.configs.database.uri);

    app.models          = {};
    app.models.User     = require('./User')(app);
    app.models.Category = require('./Category')(app);
    app.models.Event    = require('./Event')(app);
};