"use strict"

module.exports = function(app) {
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