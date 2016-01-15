"use strict";

module.exports = function(app){
    return function(req, res, next) {
        var userId =  req.session.userId;

        app.models.User.findOne({
            _id: userId
        }, function(err, instance) {
            if (err) {
                return res.status(500).send({ error : err });
            }
            else if (!instance) {
                return res.status(401).json({ error : 'you must be authenticated' });
            }

            next();
        });
    };
};