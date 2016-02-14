"use strict"

module.exports = function(app) {
    return function(req, res, next){
        app.models.Category.find().exec()
        .then(function(instances) {
            res.json(instances);
        })
        ;
    }
};