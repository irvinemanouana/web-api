"use strict"

module.exports = function(app) {
    return function(req, res, next){
        var username = req.body.username,
            password = req.body.password;

        app.models.User.findOne(
        {
            $or:[ 
                {
                    username: username,
                    password: password
                },
                {
                    username: username
                }
            ]
        })
        .select('+password')
        .exec(function(err, instance) {
            if (err) {
                return res.status(500).json({ error : err });
            }
            else if ( !instance ) {
                return res.status(404).json({ error : 'account not found' });
            }
            else if (instance.password != password) {
                return res.status(401).json({ error : 'Unauthorized' });
            }
            else {
                app.models.User.findOne(
                {
                    username: username,
                    password: password
                }, function(err, toReturn) {
                    if (err) {
                        return res.status(500).json({ error : err });
                    }
                    else {
                        req.session.userId = toReturn.id;
                        return res.json(toReturn);
                    }
                });
            }
        });
    }
};