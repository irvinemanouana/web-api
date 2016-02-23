"use strict"

module.exports = function(app) {
    /**
     * @api {PUT} /api/user Update user
     * @apiName Update
     * @apiGroup User
     * @apiPermission OAuth2User
     *
     * @apiVersion 1.0.0
     * 
     * @apiParam {String} name          Body parameter [Require]
     * @apiParam {String} firstname     Body parameter [Require]
     *
     * @apiDescription Allow to update user.
     * Only username and fistname can be updated.
     *
     * @apiSuccess User Model without password
     */
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