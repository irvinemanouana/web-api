"use strict"

module.exports = function(app) {
    return function(req, res, next){
        var categoryId = req.params.id;

        if ( !categoryId || !global.isObjectId(categoryId) ) {
            return next(app.errors.BAD_PARAMS_URL);
        }
        else {
            var promise             = app.models.Category.findById(categoryId).exec(),
                categoryToRemove    = undefined;

            promise.then(function (instance) {
                if ( !instance ) {
                    return next(app.errors.CATEGORY_NOT_FOUND);
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