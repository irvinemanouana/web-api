"use strict"

module.exports = function(app) {
    return function(req, res, next){
        var userId  = req.user.id;

        app.models.User.findById( userId ).exec()
        .then(function(instance) {
            if ( !instance.avatar ) {
                return next(app.errors.USER_AVATAR_NOT_FOUND);
            }
            else {
                res.download(instance.avatar, 'avatar');
            }
        })
        ;
    };
};