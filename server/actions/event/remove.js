"use strict"

module.exports = function(app) {
    return function(req, res, next){
        var eventId     = req.params.id,
            userId      = req.user.id;

        if ( !eventId ) {
            return res.status(500).send({ error : 'check parameter' });
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
                        instance.remove(function(err, event) {
                            if (err) {
                                return res.status(500).json({ error : err });
                            }
                            else {
                                app.models.Event.findById(instance.id,
                                    function(err, finding) {
                                        if (err) {
                                            return res.status(500).json({ error : err });
                                        }
                                        else if (finding) {
                                            return res.status(500).json({ error : 'Event is not removed' }); 
                                        }
                                        else {
                                            res.json(instance);
                                        }
                                    }
                                );
                            }
                        });
                    }
                }
            );
        }
    }
};