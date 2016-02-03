"use strict";

module.exports = function(app){

    var OAuthAccessTokenSchema = new app.mongoose.Schema({
        accessToken: { 
            type: String,
            require: true
        },
        clientId: { 
            type : String,
            require: true 
        },
        userId: { 
            type : app.mongoose.Schema.ObjectId, 
            ref : 'User',
            require: true 
        },
        expires: {
            type: Date,
            require: true
        }
    });

    OAuthAccessTokenSchema.plugin(require('mongoose-timestamp'));

    return app.mongoose.model('OAuthAccessToken', OAuthAccessTokenSchema);
};