"use strict"

module.exports = function(app) {
    /**
     * @api {GET} /api/event/:id/icon Show icon
     * @apiName Show icon
     * @apiGroup Event
     * @apiPermission OAuth2User
     *
     * @apiVersion 1.0.0
     *
     * @apiParam {String} id Event ID
     *
     * @apiDescription Allow to upload icon's event.
     *
     * @apiSuccess Event Model
     */
    return function(req, res, next){
        var eventId     = req.params.id;

        if ( global.isNullOrEmpty(eventId) ) {
            return next(app.errors.BAD_PARAMETER_URL);
        }
        else if ( !global.isObjectId(eventId ) ) {
            return next(app.errors.OBJECT_ID_NOT_VALID);
        }
        else{
            app.models.Event.findById( eventId ).exec()
            .then(function(instance) {
                if ( !instance.logo ) {
                    return next(app.errors.EVENT_AVATAR_NOT_FOUND);
                }
                else {
                    res.download(instance.logo, 'logo');
                }
            })
            ;
        }
    };
};