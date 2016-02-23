"use strict"

module.exports = function(app) {
    /**
     * @api {GET} /api/user/avatar Show avatar
     * @apiName Show avatar
     * @apiGroup User
     * @apiPermission OAuth2User
     *
     * @apiVersion 1.0.0
     *
     * @apiDescription Allow to show avatar's user.
     *
     * @apiSuccess Image Represent avatar's user
     */
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