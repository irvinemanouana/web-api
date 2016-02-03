"use strict";

module.exports = function(app){

    var OAuthClientsSchema = new app.mongoose.Schema({
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

    OAuthClientsSchema.plugin(require('mongoose-timestamp'));

    return app.mongoose.model('OAuthClients', OAuthClientsSchema);;
};