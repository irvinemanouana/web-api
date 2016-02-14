"use strict"

module.exports = function(app) {
    return function(req, res, next){
        var eventId = req.params.id;

        if ( global.isNullOrEmpty(eventId) ) {
            return next(app.errors.BAD_PARAMETER_URL);
        }
        else if ( !global.isObjectId(eventId ) ) {
            return next(app.errors.OBJECT_ID_NOT_VALID);
        }
        else {
            app.models.Event.findById(eventId).populate('category').exec()
            .then(function(instance) {
                if ( !instance ) {
                    return next(app.errors.EVENT_NOT_FOUND);
                }
                else {
                    res.json(instance);
                }
            })
            ;
        }
    }
};