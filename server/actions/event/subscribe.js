"use strict"

module.exports = function(app) {
    return function(req, res, next){
        var eventId = req.params.id,
            userId  = req.session.userId,
            user    = req.params.user;

        if ( !eventId || !user) {
            return res.status(500).send({ error : 'check parameter' });
        }
        else {
            app.models.Event
                .findById(eventId)
                .populate('category')
                .exec(function(err, instance) {
                    if (err) {
                        return res.status(500).json({ error : err });
                    }
                    else if ( !instance ) {
                        return res.status(404).json({ error : 'Event not found' });
                    }
                    else if (user != userId && instance.creator != userId) {
                        return res.status(401).json({ error : 'Cannot to added another user because you are not creator' });
                    }
                    else if ( instance.creator == user ) {
                        return res.status(500).json({ error : 'By default, creator is added' });
                    }
                    else {
                        app.models.Event
                            .findOne({ members: { "$in" : [user] } }, 
                                function(err, member) {
                                    if (err) {
                                        return res.status(500).json({ error : err });
                                    }
                                    else if (member) {
                                        return res.status(500).json({ error : 'This member is already added' });
                                    }
                                    else {
                                        app.models.User
                                            .findById(user, function(err, memberToAdded) {
                                                if (err) {
                                                    return res.status(500).json({ error : err });
                                                }
                                                else {
                                                    instance.members.push(memberToAdded);
                                                    instance.save(function(err, saving){
                                                        if (err) {
                                                            return res.status(500).json({ error : err });
                                                        }
                                                        else {
                                                            app.models.Event.findById( saving.id )
                                                                .populate('category')
                                                                .exec(function(err, finding) {
                                                                    if (err) {
                                                                        return res.status(500).json({ error : err });
                                                                    }
                                                                    else {
                                                                        res.json(finding);
                                                                    }
                                                                })
                                                            ;
                                                        }
                                                    });
                                                }
                                            })
                                        ;
                                    }
                                }
                            )
                        ;
                    }
                })
            ;
        }
    }
};