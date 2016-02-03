"use strict";

module.exports = function(app){

    var OAuthClientSchema = new app.mongoose.Schema({
        clientId: { 
            type: String,
            require: true,
            unique: true
        },
        clientSecret: { 
            type: String,
            require: true
        },
        redirectUri: { 
            type: String,
            require: true 
        }
    });

    OAuthClientSchema.plugin(require('mongoose-timestamp'));

    return app.mongoose.model('OAuthClient', OAuthClientSchema);
};