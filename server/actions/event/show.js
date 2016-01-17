"use strict"

module.exports = function(app) {
    return function(req, res, next){
        var eventId = req.params.id;

        if ( !eventId ) {
            return res.status(500).send({ error : 'check parameter' });
        }
        else {
            app.models.Event
                .findById(eventId)
                .populate('category')
                .exec(function(err, instance) {
                    if (err) {
                        return res.status(500).json({ error : err });
                    }
                    else if ( !instance ) {
                        return res.status(404).json({ error : 'Event not found' });
                    }
                    else {
                        res.json(instance);
                    }
                })
            ;
        }
    }
};