"use strict"

module.exports = function(app) {
    return function(req, res, next){
        var categoryId = req.params.id;

        if ( global.isNullOrEmpty(categoryId) ) {
            return next(app.errors.BAD_PARAMETER_URL);
        }
        else if ( !global.isObjectId(categoryId ) ) {
            return next(app.errors.OBJECT_ID_NOT_VALID);
        }
        else {
            app.models.Category.findById(categoryId).exec()
            .then(function(instance) {
                if ( !instance ) {
                    return next(app.errors.CATEGORY_NOT_FOUND);
                }
                else {
                    res.json(instance);
                }
            })
            ;
        }
    }
};