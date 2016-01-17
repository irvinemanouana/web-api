"use strict"

module.exports = function(app) {
    return function(req, res, next){
        app.models.Category.find({},
            function(err, instances) {
                if (err) {
                    return res.status(500).json({ error : err });
                } else {
                    res.json(instances);
                }
            }
        );
    }
};