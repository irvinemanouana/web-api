"use strict"

module.exports = function(app) {
    /**
     * @api {POST} /api/category Create category
     * @apiName Create
     * @apiGroup Category
     * @apiPermission OAuth2User
     *
     * @apiVersion 1.0.0
     *
     * @apiHeader {String} ContentTypes:application/json
     *
     * @apiDescription Allow to create category.
     * This API is available for admin.
     *
     * @apiSuccess Category Model
     */
    return function(req, res, next){
        var userId  = req.user.id,
            name    = req.body.name;

        if (global.isNullOrEmpty(name)) {
            return next(app.errors.BAD_BODY_PARAMETER);
        }
        else {
            var category = new app.models.Category({
                name: name,
                creator: userId
            });

            app.models.Category.findOne( { name: name } ).exec()
            .then(function(instance) {
                if ( instance ) {
                    return next(app.errors.CATEGORY_ALREADY_EXISTS);
                }
                else {
                    return category.save();
                }
            })
            .then(function(instance) {
                res.json(instance);
            })
            ;
        }
    }
};