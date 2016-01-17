"use strict"

module.exports = function(app) {
    return function(req, res, next){
        var name    = req.body.name;

        if ( !name ) {
            return res.status(500).send({ error : 'check body parameter' });
        }
        else {
            var category = new app.models.Category({
                name: name
            });

            app.models.Category.findOne( { name: name },
                function(err, instance) {
                    if (err) {
                        return res.status(500).json({ error : err });
                    }
                    else if ( instance ) {
                        return res.status(500).json({ error : 'Category already exists' });
                    } else {
                        category.save(function(err, instance){
                            if (err) {
                                return res.status(500).json({ error : err });
                            }
                            else {
                                res.json(instance);
                            }
                        });
                    }
                }
            );
        }
    }
};