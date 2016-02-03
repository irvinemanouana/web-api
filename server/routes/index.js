"use strict";

module.exports = function(app){

    app.use('/oauth', require('./oauth')(app));
    app.use('/api/user', require('./user')(app));
    app.use('/api/category', require('./category')(app));
    app.use('/api/event', require('./event')(app));
    app.use(app.oauth.errorHandler());
    app.use('/api/', app.middlewares.clientErrorHandler);

};