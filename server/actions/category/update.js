"use strict"

module.exports = function(app) {
    return function(req, res, next){
        var userId              = req.user.id,
            categoryId          = req.params.id,
            name                = req.body.name,
            categoryToUpdate    = null;

        if ( global.isNullOrEmpty(categoryId) ) {
            return next(app.errors.BAD_PARAMETER_URL);
        }
        else if ( !global.isObjectId(categoryId ) ) {
            return next(app.errors.OBJECT_ID_NOT_VALID);
        }
        else if ( global.isNullOrEmpty(name) ) {
            return next(app.errors.BAD_BODY_PARAMETER);
        }
        else {
            app.models.Category.findById( categoryId ).exec()
            .then(function(instance) {
                if ( !instance ) {
                    return next(app.errors.CATEGORY_NOT_FOUND);
                }
                else if (instance.creator.id == userId) {
                    return next(app.errors.CATEGORY_USER_NOT_CREATOR);
                }
                else {
                    categoryToUpdate = instance;
                    return app.models.Category.findOne( { name : name } ).exec();
                }
            })
            .then(function(instance) {
                if (instance && instance.id != categoryId) {
                    return next(app.errors.CATEGORY_ALREADY_EXISTS);
                }
                else if (instance && instance.id == categoryId) {
                    return res.json(instance);
                }
                else {
                    categoryToUpdate.name = name;
                    return categoryToUpdate.save();
                }
            })
            .then(function(instance) {
                res.json(instance);
            })
            ;
        }
    }
}