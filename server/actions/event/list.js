"use strict"

module.exports = function(app) {
    return function(req, res, next){
        var count   = parseInt(req.query.count),
            page    = parseInt(req.query.page),
            first   = ((count * page) - count);

        app.models.Event.find()
        .limit(count).skip(first)
        .populate('category').exec()
        .then(function(instances) {
            res.json(instances);
        })
        ;
    }
};