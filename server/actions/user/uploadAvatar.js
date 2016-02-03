"use strict"

module.exports = function(app) {
    return function(req, res, next){
        var userId  = req.user.id,
            file    = req.file;

        if (file) {
            app.models.User.findById( userId,
                function(err, instance) {
                    if (err) {
                        return res.status(500).json({ error : err });
                    } else {
                        instance.avatar = file.path;
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
        else {
            return res.status(500).send({ 'error' : 'Upload failed' });
        }
    };
};