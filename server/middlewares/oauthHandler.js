"use strict";

module.exports = function(app){
    var oauthHandler = {};

    oauthHandler.getAccessToken = function (bearerToken, callback) {
        app.models.OAuthAccessToken.findOne({ accessToken: bearerToken }, callback);
    };

    oauthHandler.saveAccessToken = function (token, clientId, expires, userId, callback) {
        userId = (typeof(userId) === "object") ? userId.id : userId;

        var accessToken = new app.models.OAuthAccessToken({
            accessToken: token,
            clientId: clientId,
            userId: userId,
            expires: expires
        });
        
        accessToken.save(callback);
    };

    oauthHandler.getClient = function (clientId, clientSecret, callback) {
        app.models.OAuthClient.findOne({ clientId: clientId, clientSecret: clientSecret }, callback);
    };

    oauthHandler.saveClient = function (clientId, clientSecret, redirectUri, callback) {

        var client = new app.models.OAuthClient({
            clientId: clientId,
            clientSecret: clientSecret,
            redirectUri: redirectUri
        });

        client.save(callback);
    };

    oauthHandler.grantTypeAllowed = function (clientId, grantType, callback) {
        callback(false, true);
    };

    oauthHandler.getUser = function (username, password, callback) {
        var hashPassword = global.Crypto.SHA512(password);
        app.models.User.findOne({ username: username, password: hashPassword.toString() }, 
            function(err, user) {
                if(err) {
                    console.log("Error getUser : %s", err);
                    return callback(err);
                } 
                
                console.log(user);
                callback(null, user.id);
            }
        );
    }

    oauthHandler.getRefreshToken = function (refreshToken, callback) {
        app.models.OAuthRefreshToken.findOne({ refreshToken: refreshToken }, callback);
    };

    oauthHandler.saveRefreshToken = function (token, clientId, expires, userId, callback) {
        userId = (typeof(userId) === "object") ? userId.id : userId;

        var refreshToken = new app.models.OAuthRefreshToken({
            refreshToken: token,
            clientId: clientId,
            userId: userId,
            expires: expires
        });

        refreshToken.save(callback);
    };

    return oauthHandler;
};