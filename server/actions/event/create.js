"use strict"

module.exports = function(app) {
    return function(req, res, next){
        var userId          = req.user.id,
            title           = req.body.title,
            categoryId      = req.body.categoryId,
            description     = req.body.description,
            dateString      = req.body.date,
            date            = new Date(dateString),
            dateNow         = new Date();

        var eventApp = new app.models.Event({
            title: title,
            category: categoryId,
            creator: userId,
            description: description,
            date: date
        });

        if ( global.isNullOrEmpty(title) || global.isNullOrEmpty(categoryId) || 
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
                app.models.Category.findById( categoryId ).exec(),
                app.models.Event.findOne( {title:title}).exec(),
            ];
            
            global.Promise.all(promises)
            .then(function (promises) {
                var category    = promises[0],
                    event       = promises[1];

                if (!category) {
                    return next(app.errors.CATEGORY_NOT_FOUND);
                }
                else if (event) {
                    return next(app.errors.EVENT_ALREADY_EXISTS);
                }
                else {
                    return eventApp.save();
                }
            })
            .then(function(instance) {
                if (instance) {
                    return app.models.Event.findById(instance.id).populate('category').exec();
                }
            })
            .then(function(instance) {
                return res.json(instance);
            })
            ;
        }
    }
};