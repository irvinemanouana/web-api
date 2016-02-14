"use strict"

module.exports = function(app) {
    return function(req, res, next){
        var userId = req.user.id,
            userToRemoved = null;

        app.models.User.findById( userId ).exec()
        .then(function(instance) {
            userToRemoved = instance;
            return instance.remove();
        })
        .then(function(instance) {
            return app.models.User.findById( userId ).exec();
        })
        .then(function(instance) {
            if (instance) {
                return next(app.errors.USER_HAS_NOT_BEEN_REMOVED);
            }
            else {
                var promises = [
                    app.models.OAuthAccessToken.find( {userId:userId}).remove().exec(),
                    app.models.OAuthRefreshToken.find( {userId:userId}).remove().exec(),
                ];

                return global.Promise.all(promises);
            }
        })
        .then(function(promises) {
            return res.json(userToRemoved);
        })
        ;
    };
};