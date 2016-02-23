"use strict"

module.exports = function(app) {
    /**
     * @api {DELETE} /api/event/:id/unsubscribe/:user Unsubscribe user
     * @apiName Unsubscribe user
     * @apiGroup Event
     * @apiPermission OAuth2User
     *
     * @apiVersion 1.0.0
     *
     * @apiParam {String} id
     * @apiParam {String} user
     *
     * @apiDescription Allow to unsubscribe user to event.
     *
     * @apiSuccess Event Model
     */
    return function(req, res, next){
        var userId      = req.user.id,
            eventId     = req.params.id,
            user        = req.params.user,
            eventObject = undefined,
            userObject  = undefined

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
                    return next(app.errors.EVENT_USER_NOT_CREATOR_UNSUBSCRIBE_USER);
                }
                else if ( eventObject.creator == user ) {
                    return next(app.errors.EVENT_USER_CREATOR_UNSUBSCRIBE);
                }
                else {
                    return app.models.Event.findOne({ members: { "$in" : [userObject] } }).exec();
                }
            })
            .then(function(instance) {
                if (!instance) {
                    return next(app.errors.EVENT_USER_NOT_MEMBER);
                }
                else {
                    return app.models.Event.findOneAndUpdate({ _id: eventId }, { $pull: { members: user } }).exec();
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