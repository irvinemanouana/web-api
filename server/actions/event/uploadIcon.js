"use strict"

module.exports = function(app) {
    return function(req, res, next){
        var eventId     = req.params.id,
            userId      = req.session.userId,
            file        = req.file;

        console.log(file);

        if (file) {
            app.models.Event.findById( eventId,
                function(err, instance) {
                    if (err) {
                        return res.status(500).json({ error : err });
                    }
                    else if ( !instance ) {
                        return res.status(404).json({ error : 'Event not found' });
                    }
                    else if ( instance.creator != userId ) {
                        return res.status(401).json({ error : 'User is not creator' });
                    }
                    else {
                        instance.logo = file.path;
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
        else {
            return res.status(500).send({ 'error' : 'Upload failed' });
        }
    };
};