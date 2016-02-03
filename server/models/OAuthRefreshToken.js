"use strict";

module.exports = function(app){

    var OAuthRefreshTokenSchema = new app.mongoose.Schema({
        refreshToken: { 
            type: String,
            require: true
        },
        clientId: { 
            type: String,
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

    OAuthRefreshTokenSchema.plugin(require('mongoose-timestamp'));

    return app.mongoose.model('OAuthRefreshToken', OAuthRefreshTokenSchema);
};