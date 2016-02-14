"use strict"

module.exports = function(app) {
    return function(req, res, next){
        var eventId     = req.params.id,
            userId      = req.user.id,
            file        = req.file;

        if ( global.isNullOrEmpty(eventId) ) {
            return next(app.errors.BAD_PARAMETER_URL);
        }
        else if ( !global.isObjectId(eventId ) ) {
            return next(app.errors.OBJECT_ID_NOT_VALID);
        }
        else if (!file) {
            return next(app.errors.FILE_NOT_UPLOAD);
        }
        else {
            app.models.Event.findById( eventId ).exec()
            .then(function(instance) {
                if ( !instance ) {
                    return next(app.errors.EVENT_NOT_FOUND);
                }
                else if (instance.creator.toString() !== userId.toString()) {
                    return next(app.errors.EVENT_USER_NOT_CREATOR);
                }
                else {
                    instance.logo = file.path;
                    return instance.save();
                }
            })
            .then(function(instance) {
                return app.models.Event.findById(instance.id).populate('category').exec()
            })
            .then(function(instance) {
                res.json(instance);
            })
            ;
        }
    };
};