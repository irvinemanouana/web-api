"use strict"

module.exports = function(app) {
    /**
     * @api {POST} /api/user/avatar Upload avatar
     * @apiName Upload avatar
     * @apiGroup User
     * @apiPermission OAuth2User
     *
     * @apiVersion 1.0.0
     *
     * @apiParam {File} image with field="avatar"
     *
     * @apiDescription Allow to upload avatar's user.
     *
     * @apiSuccess User Model without password
     */
    return function(req, res, next){
        var userId  = req.user.id,
            file    = req.file;

        if (!file) {
            return next(app.errors.FILE_NOT_UPLOAD);
        }
        else {
            app.models.User.findById( userId ).exec()
            .then(function(instance) {
                instance.avatar = file.path;
                return instance.save();
            })
            .then(function(instance) {
                return app.models.User.findById( userId ).exec();
            })
            .then(function(instance) {
                return res.json(instance);
            })
            ;
        }
    };
};