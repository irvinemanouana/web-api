"use strict"

module.exports = function(app){
    return {
        login:  require('./login')(app),
        logout: require('./logout')(app)
    };
};