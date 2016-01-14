"use strict";

module.exports = function(app){

    var CategorySchema = new app.mongoose.Schema({
        name: { 
            type: String,
            require: true,
            unique: true
        }
    });

    CategorySchema.plugin(require('mongoose-timestamp'));

    return app.mongoose.model('Category', CategorySchema);;
};