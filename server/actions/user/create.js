"use strict"

module.exports = function(app) {
    return function(req, res, next){
        var username    = req.body.username,
            password    = req.body.password,
            email       = req.body.email,
            name        = req.body.name,
            firstname   = req.body.firstname;

        if ( !username || !password || !email || !name || !firstname ) {
            return res.status(500).send({ error : 'check body parameter' });
        }
        else {
            var user = new app.models.User({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                name: req.body.name,
                firstname: req.body.firstname,
            });

            app.models.User.findOne( { $or: [ { username: username }, { email: email } ] },
                function(err, instance) {
                    if (err) {
                        return res.status(500).json({ error : err });
                    }
                    else if ( instance ) {
                        return res.status(500).json({ error : 'User already exists' });
                    } else {
                        user.save(function(err, instance){
                            if (err) {
                                return res.status(500).json({ error : err });
                            }
                            else {
                                app.models.User.findById(instance.id, 
                                    function(err, finding) {
                                        if (err) {
                                            return res.status(500).json({ error : err });
                                        }
                                        else {
                                            res.json(finding);
                                        }
                                    }
                                );
                            }
                        });
                    }
                }
            );
        }
    }
};