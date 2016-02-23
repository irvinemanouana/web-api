"use strict"

module.exports = function(app) {
    /**
     * @api {GET} /api/user Show user
     * @apiName Show
     * @apiGroup User
     * @apiPermission OAuth2User
     *
     * @apiVersion 1.0.0
     *
     * @apiDescription Allow to show user.
     *
     * @apiSuccess User Model without password
     */
    return function(req, res, next){
        var userId = req.user.id;

        app.models.User.findById(userId).exec()
        .then(function(instance) {
            return res.json(instance);
        });
    }
}