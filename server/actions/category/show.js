"use strict"

module.exports = function(app) {
    /**
     * @api {GET} /api/category/:id Show category
     * @apiGroup Category
     * @apiName Show
     * @apiPermission none
     *
     * @apiVersion 1.0.0
     *
     * @apiParam {String} id
     *
     * @apiDescription Allow to show one category.
     *
     * @apiSuccess Category Model
     */
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