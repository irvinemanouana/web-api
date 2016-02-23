"use strict"

module.exports = function(app) {
    /**
     * @api {PUT} /api/event Update event
     * @apiName Update
     * @apiGroup Event
     * @apiPermission OAuth2User
     *
     * @apiVersion 1.0.0
     *
     * @apiHeader {String} ContentTypes:application/json
     *
     * @apiParam {String} id Event ID
     *
     * @apiParam {String} title          Body parameter [Require]
     * @apiParam {String} categoryId     Body parameter [Require]
     * @apiParam {String} description    Body parameter [Require]
     * @apiParam {String} date           Body parameter [Require] Format:yyyy-MM-ddThh:mm:ssZ
     *
     * @apiDescription Allow to update event.
     *
     * @apiSuccess Event Model
     */
    return function(req, res, next){
        var userId          = req.user.id,
            eventId         = req.params.id,
            title           = req.body.title,
            categoryId      = req.body.categoryId,
            description     = req.body.description,
            dateString      = req.body.date,
            date            = new Date(dateString),
            dateNow         = new Date();

        if ( global.isNullOrEmpty(eventId) ) {
            return next(app.errors.BAD_PARAMETER_URL);
        }
        else if ( !global.isObjectId(eventId ) ) {
            return next(app.errors.OBJECT_ID_NOT_VALID);
        }
        else if ( global.isNullOrEmpty(title) || global.isNullOrEmpty(categoryId) || 
                global.isNullOrEmpty(description) || global.isNullOrEmpty(dateString) ) {
            return next(app.errors.BAD_BODY_PARAMETER);
        }
        else if ( !global.isObjectId(categoryId) ) {
            return next(app.errors.OBJECT_ID_NOT_VALID);
        }
        else if ( !global.isDateValid(date) || date.getTime() < dateNow.getTime()) {
            return next(app.errors.DATE_NOT_VALID);
        }
        else {
            var promises = [
                app.models.Event.findById( eventId ).exec(),
                app.models.Event.findOne( {title:title}).exec(),
                app.models.Category.findById( categoryId ).exec(),
            ];

            global.Promise.all(promises)
            .then(function (promises) {
                var currentEvent    = promises[0],
                    event           = promises[1],
                    category        = promises[2];

                if (!currentEvent) {
                    return next(app.errors.EVENT_NOT_FOUND);
                }
                else if (currentEvent.creator.toString() !== userId.toString()) {
                    return next(app.errors.EVENT_USER_NOT_CREATOR);
                }
                else if (!category) {
                    return next(app.errors.CATEGORY_NOT_FOUND);
                }
                else if (event && event.creator.toString() !== userId.toString()) {
                    return next(app.errors.EVENT_ALREADY_EXISTS);
                }
                else if (event && event.creator.toString() === userId.toString()) {
                    return res.json(currentEvent);
                }
                else {
                    currentEvent.title          = title;
                    currentEvent.category       = categoryId;
                    currentEvent.description    = description;
                    currentEvent.date           = date;
                    return currentEvent.save();
                }
            })
            .then(function(instance) {
                if (instance) {
                    return app.models.Event.findById(instance.id).populate('category').exec();
                }
            })
            .then(function(instance) {
                if (instance) {
                    return res.json(instance);
                }
            })
            ;
        }
    }
};