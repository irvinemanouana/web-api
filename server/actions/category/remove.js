"use strict"

module.exports = function(app) {
    return function(req, res, next){
        var userId      = req.user.id,
            categoryId  = req.params.id;

        if ( global.isNullOrEmpty(categoryId) ) {
            return next(app.errors.BAD_PARAMETER_URL);
        }
        else if ( !global.isObjectId(categoryId) ) {
            return next(app.errors.OBJECT_ID_NOT_VALID);
        }
        else {
            var categoryToRemove = undefined;

            app.models.Category.findById( categoryId ).exec()
            .then(function(instance) {
                if ( !instance ) {
                    return next(app.errors.CATEGORY_NOT_FOUND);
                }
                else if (instance.creator.id == userId) {
                    return next(app.errors.CATEGORY_USER_NOT_CREATOR);
                }
                else {
                    categoryToRemove = instance;
                    return app.models.Event.findOne({category : instance}).exec();
                }
            })
            .then(function (instance) {
                if (instance) {
                    return next(app.errors.CATEGORY_USED_BY_EVENTS);
                }
                else {
                    return categoryToRemove.remove();
                }
            })
            .then(function (instance) {
                return app.models.Category.findById(categoryId).exec();
            })
            .then(function (instance) {
                if ( !instance ) {
                    return res.json(categoryToRemove);
                }
                else {
                    return next(app.errors.CATEGORY_REMOVED_FAILLED);
                }
            })
            ;
        }
    }
};