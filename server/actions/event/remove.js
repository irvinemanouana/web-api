"use strict"

module.exports = function(app) {
    /**
     * @api {GET} /api/event/:id Remove event
     * @apiName Remove
     * @apiGroup Event
     * @apiPermission OAuth2User
     *
     * @apiVersion 1.0.0
     *
     * @apiParam {String} id
     *
     * @apiDescription Allow to remove event.
     *
     * @apiSuccess Event Model
     */
    return function(req, res, next){
        var eventId     = req.params.id,
            userId      = req.user.id;

        if ( global.isNullOrEmpty(eventId) ) {
            return next(app.errors.BAD_PARAMETER_URL);
        }
        else if ( !global.isObjectId(eventId ) ) {
            return next(app.errors.OBJECT_ID_NOT_VALID);
        }
        else {
            var eventToRemove = undefined;

            app.models.Event.findById(eventId).exec()
            .then(function(instance) {
                if (!instance) {
                    return next(app.errors.EVENT_NOT_FOUND);
                }
                else if (instance.creator.toString() !== userId.toString()) {
                    return next(app.errors.EVENT_USER_NOT_CREATOR);
                }
                else {
                    eventToRemove = instance;
                    return instance.remove();
                }
            })
            .then(function(instance) {
                if (instance) {
                    return app.models.Event.findById(instance.id).populate('category').exec();
                }
            })
            .then(function(instance) {
                if ( !instance ) {
                    return res.json(eventToRemove);
                }
                else {
                    return next(app.errors.EVENT_REMOVED_FAILLED);
                }
            })
            ;
        }
    }
};