"use strict"

module.exports = function(app) {
    return function(req, res, next){
        var title           = req.body.title,
            categoryId      = req.body.categoryId,
            userId          = req.user.id,
            description     = req.body.description,
            dateString      = req.body.date;

        if ( !title || !categoryId || !description || !dateString ) {
            return res.status(500).send({ error : 'check body parameter' });
        }
        else {
            var eventApp = new app.models.Event({
                title: title,
                category: categoryId,
                creator: userId,
                description: description,
                date: new Date(dateString)
            });

            app.models.Category.findById( categoryId,
                function(err, instance) {
                    if (err) {
                        return res.status(500).json({ error : err });
                    }
                    else if ( !instance ) {
                        return res.status(404).json({ error : 'Category not found' });
                    } else {
                        eventApp.save(function(err, saving){
                            if (err) {
                                return res.status(500).json({ error : err });
                            }
                            else {
                                app.models.Event.findById( saving.id)
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
};