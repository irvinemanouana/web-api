"use strict"

module.exports = function(app) {
    /**
     * @api {POST} /api/user Subscribe user
     * @apiName Subscribe
     * @apiGroup User
     * @apiPermission none
     *
     * @apiVersion 1.0.0
     *
     * @apiHeader {String} ContentTypes:application/json
     *
     * @apiParam {String} username      Body parameter [Require]
     * @apiParam {String} password      Body parameter [Require] hashed in SHA512
     * @apiParam {String} email         Body parameter [Require]
     * @apiParam {String} name          Body parameter [Require]
     * @apiParam {String} firstname     Body parameter [Require]
     *
     * @apiDescription Allow to register user.
     * Password must be hashed in SHA512.
     *
     * @apiSuccess User Model without password
     */
    return function(req, res, next){
        var username    = req.body.username,
            password    = req.body.password,
            email       = req.body.email,
            name        = req.body.name,
            firstname   = req.body.firstname;

        if ( global.isNullOrEmpty(username) || global.isNullOrEmpty(password) || global.isNullOrEmpty(email) || 
                global.isNullOrEmpty(name) || global.isNullOrEmpty(firstname) ) {
            return next(app.errors.BAD_BODY_PARAMETER);
        }
        else if (password.length < 7){
            return next(app.errors.PASSWORD_TOO_SHORT);
        }
        else if (!global.isEmailValid(email)){
            return next(app.errors.EMAIL_NOT_VALID);
        }
        else {
            var user = new app.models.User({
                username: username,
                password: password,
                email: email,
                name: name,
                firstname: firstname,
            });

            app.models.User.findOne( { $or: [ { username: username }, { email: email } ] }).exec()
            .then(function(instance) {
                if ( instance ) {
                    return next(app.errors.USER_ALREADY_EXISTS);
                }
                return user.save();
            })
            .then(function(instance) {
                return app.models.User.findById(instance.id).exec();
            })
            .then(function(instance) {
                return res.json(instance);
            })
            ;
        }
    }
};