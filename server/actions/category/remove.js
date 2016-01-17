"use strict"

module.exports = function(app) {
    return function(req, res, next){
        var categoryId = req.params.id;

        if ( !categoryId ) {
            return res.status(500).send({ error : 'check parameter' });
        }
        else {
            app.models.Category.findByIdAndRemove(categoryId,
                function(err, instance) {
                    if (err) {
                        return res.status(500).json({ error : err });
                    }
                    else if ( !instance ) {
                        return res.status(404).json({ error : 'Category not found' });
                    }
                    else {
                        res.json(instance);
                    }
                }
            );
        }
    }
};