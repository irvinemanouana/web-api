"use strict";

module.exports = function(app){
    return function(err, req, res, next) {
        return res.status(500).send(err);
    };
};