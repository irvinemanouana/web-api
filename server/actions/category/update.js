"use strict"

module.exports = function(app) {
    return function(req, res, next){
        var userId      = req.user.id,
            categoryId  = req.params.id,
            name        = req.body.name;

        if ( !categoryId ) {
            return res.status(500).send({ error : 'check parameter' });
        }
        else if ( !name ) {
            return res.status(500).send({ error : 'check body parameter' });
        }
        else {
             app.models.Category.findOne({ name : name },
                function(err, instance) {
                    if (err) {
                        return res.status(500).json({ error : err });
                    }
                    else if ( !instance ) {
                        return res.status(404).json({ error : 'Category not found' });
                    }
                    else if ( instance && instance.id != categoryId) {
                        return res.status(500).json({ error : 'this name already used by another category' });
                    } else {
                         app.models.Category.findById(categoryId,
                            function(err, finding) {
                                if (err) {
                                    return res.status(500).json({ error : err });
                                }
                                else {
                                    finding.name = name;
                                    finding.save(function(err, saving){
                                        if (err) {
                                            return res.status(500).json({ error : err });
                                        }
                                        else {
                                            res.json(saving);
                                        }
                                    });
                                }
                            }
                        );
                        
                    }
                }
            );
        }
    }
}