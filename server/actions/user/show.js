"use strict"

module.exports = function(app) {
    return function(req, res, next){
        var userId = req.user.id;

        app.models.User.findById(userId).exec()
        .then(function(instance) {
            return res.json(instance);
        });
    }
}