"use strict"

module.exports = function(app) {
    /**
     * @api {POST} /api/event/:id/subscribe/:user Subscribe user
     * @apiName Subscribe user
     * @apiGroup Event
     * @apiPermission OAuth2User
     *
     * @apiVersion 1.0.0
     *
     * @apiParam {String} id
     * @apiParam {String} user
     *
     * @apiDescription Allow to subscribe user to event.
     *
     * @apiSuccess Event Model
     */
    return function(req, res, next){
        var userId      = req.user.id,
            eventId     = req.params.id,
            user        = req.params.user,
            eventObject = undefined,
            userObject  = undefined;

        if ( global.isNullOrEmpty(user) || global.isNullOrEmpty(eventId) ) {
            return next(app.errors.BAD_PARAMETER_URL);
        }
        else if ( !global.isObjectId(user) || !global.isObjectId(eventId) ) {
            return next(app.errors.OBJECT_ID_NOT_VALID);
        }
        else {
            var promises = [
                app.models.Event.findById(eventId).exec(),
                app.models.User.findById(user).exec(),
            ];
            
            global.Promise.all(promises)
            .then(function(promises) {
                eventObject     = promises[0];
                userObject      = promises[1];

                if ( !eventObject ) {
                    return next(app.errors.EVENT_NOT_FOUND);
                }
                else if (user != userId && eventObject.creator.toString() !== userId.toString()) {
                    return next(app.errors.EVENT_USER_NOT_CREATOR_SUBSCRIBE_USER);
                }
                else if ( eventObject.creator == user ) {
                    return next(app.errors.EVENT_USER_ALREADY_SUBSCRIBE);
                }
                else {
                    return app.models.Event.findOne({ members: { "$in" : [userObject] } }).exec();
                }
            })
            .then(function(instance) {
                if (instance) {
                    return next(app.errors.EVENT_MEMBER_ALREADY_SUBSCRIBE);
                }
                else {
                    eventObject.members.push(userObject);
                    return eventObject.save();
                }
            })
            .then(function(instance) {
                if (instance) {
                    return app.models.Event.findById( instance.id ).populate('category').exec();
                }
            })
            .then(function(instance) {
                if (instance) {
                    res.json(instance);
                }
            })
            ;
        }
    }
};