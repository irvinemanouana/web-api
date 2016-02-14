"use strict"

module.exports = function(app) {
    return function(req, res, next){
        var userId      = req.user.id,
            name        = req.body.name,
            firstname   = req.body.firstname;

        if ( global.isNullOrEmpty(name) || global.isNullOrEmpty(firstname) ) {
            return next(app.errors.BAD_BODY_PARAMETER);
        }
        else {
            app.models.User.findById( userId ).exec()
            .then(function(instance) {
                instance.name       = name;
                instance.firstname  = firstname; 

                return instance.save();
            })
            .then(function(instance) {
                return app.models.User.findById( userId ).exec();
            })
            .then(function(instance) {
                res.json(instance);
            })
            ;
        }
    }
}