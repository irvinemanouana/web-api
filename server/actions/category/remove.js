"use strict"

module.exports = function(app) {
    return function(req, res, next){
        var categoryId = req.params.id;

        if ( !categoryId ) {
            return res.status(500).send({ error : 'check parameter in url' });
        }
        else {
            var promise             = app.models.Category.findById(categoryId).exec(),
                categoryToRemove    = undefined;

            promise.then(function (instance) {
                if ( !instance ) {
                    return res.status(404).json({ error : 'Category not found' });
                }
                else {
                    categoryToRemove = instance;
                    return app.models.Event.findOne({category : instance}).exec();
                }
            })
            .then(function (instance) {
                if (instance) {
                    return res.status(500).json({ error : 'Cannot to remove category because it is used by events' });
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
                    res.json(categoryToRemove);
                }
                else {
                    return res.status(500).json({ error : 'Cannot to remove category' });
                }
            })
            ;
        }
    }
};