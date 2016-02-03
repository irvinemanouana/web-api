"use strict"

module.exports = function(app) {
    return function(req, res, next){
        var userId = req.user.id;

        app.models.User.findById(userId, 
            function(err, instance) {
                var name        = req.body.name,
                    firstname   = req.body.firstname;

                if ( !name || !firstname ) {
                    return res.status(500).send({ error : 'check body parameter' });
                }
                else {
                    app.models.User.findById( userId,
                        function(err, instance) {
                            if (err) {
                                return res.status(500).json({ error : err });
                            } else {
                                instance.name       = name;
                                instance.firstname  = firstname; 
                                instance.save(function(err, instance){
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
        );
    }
}