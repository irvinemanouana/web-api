"use strict"

module.exports = function(app) {
    return function(req, res, next){
        var userId  = req.session.userId;

        app.models.User.findById( userId,
            function(err, instance) {
                if (err) {
                    return res.status(500).json({ error : err });
                }
                else if ( !instance.avatar ) {
                    return res.status(404).json({ error : "User have not avatar" });
                }
                else {
                    res.download(instance.avatar, 'avatar');
                }
            }
        );
    };
};