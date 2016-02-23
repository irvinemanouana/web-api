"use strict"

module.exports = function(app) {
    /**
     * @api {GET} /api/category/all List categories
     * @apiName List
     * @apiGroup Category
     * @apiPermission none
     *
     * @apiVersion 1.0.0
     *
     * @apiDescription Allow to get all categories.
     *
     * @apiSuccess Category[] List
     */
    return function(req, res, next){
        app.models.Category.find().exec()
        .then(function(instances) {
            res.json(instances);
        })
        ;
    }
};