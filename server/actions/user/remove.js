"use strict"

module.exports = function(app) {
    return function(req, res, next){
        var userId = req.user.id;

        app.models.User.findByIdAndRemove(userId, 
            function(err, instance) {
                if (err) {
                    return res.status(500).json({ error : err });
                }
                else {
                    res.json(instance);
                }
            }
        );
    };
};