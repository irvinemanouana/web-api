"use strict"

module.exports = function(app) {
    return function(req, res, next){
        var eventId         = req.params.id,
            title           = req.body.title,
            categoryId      = req.body.categoryId,
            userId          = req.user.id,
            description     = req.body.description,
            dateString      = req.body.date;

        if ( !eventId ) {
            return res.status(500).send({ error : 'check parameter' });
        }
        else if ( !title || !categoryId || !description || !dateString ) {
            return res.status(500).send({ error : 'check body parameter' });
        }
        else {
            app.models.Event.findById(eventId,
                function(err, instance) {
                    if (err) {
                        return res.status(500).json({ error : err });
                    }
                    else if ( !instance ) {
                        return res.status(404).json({ error : 'Event not found' });
                    }
                    else if ( instance.creator.toString() !== userId.toString() ) {
                        return res.status(401).json({ error : 'User is not creator' });
                    }
                    else {
                        instance.title          = title;
                        instance.category       = categoryId;
                        instance.description    = description;
                        instance.date           = new Date(dateString);

                        app.models.Category.findById( categoryId,
                            function(err, category) {
                                if (err) {
                                    return res.status(500).json({ error : err });
                                }
                                else if ( !category ) {
                                    return res.status(404).json({ error : 'Category not found' });
                                } else {
                                    instance.save(function(err, saving){
                                        if (err) {
                                            return res.status(500).json({ error : err });
                                        }
                                        else {
                                            app.models.Event.findById( saving.id )
                                                .populate('category')
                                                .exec(function(err, finding) {
                                                    if (err) {
                                                        return res.status(500).json({ error : err });
                                                    }
                                                    else {
                                                        res.json(finding);
                                                    }
                                                })
                                            ;
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
};