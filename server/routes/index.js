"use strict";

module.exports = function(app){

    app.use('/api/auth', require('./auth')(app));
    app.use('/api/user', require('./user')(app));
    app.use('/api/category', require('./category')(app));
    app.use('/api/event', require('./event')(app));

};