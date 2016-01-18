"use strict"

module.exports = function(app) {
    return function(req, res, next){
        var eventId     = req.params.id;

        app.models.Event.findById( eventId,
            function(err, instance) {
                if (err) {
                    return res.status(500).json({ error : err });
                }
                else if ( !instance.logo ) {
                    return res.status(404).json({ error : "Event have not logo" });
                }
                else {
                    res.download(instance.logo, 'logo');
                }
            }
        );
    };
};