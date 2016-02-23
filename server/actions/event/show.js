"use strict"

module.exports = function(app) {
    /**
     * @api {GET} /api/event/:id Show event
     * @apiName Show
     * @apiGroup Event
     * @apiPermission OAuth2User
     *
     * @apiVersion 1.0.0
     *
     * @apiParam {String} id
     *
     * @apiDescription Allow to show event.
     *
     * @apiSuccess Event Model
     */
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