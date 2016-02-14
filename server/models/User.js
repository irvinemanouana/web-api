"use strict";

module.exports = function(app){

    var UserSchema = new app.mongoose.Schema({
        username: { 
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true,
            select: false
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        name: {
            type: String,
            require: true
        },
        firstname: {
            type: String,
            require: true
        },
        avatar: {
            type: String
        }
    });

    UserSchema.plugin(require('mongoose-timestamp'));

    UserSchema.pre('save', function (next) {

        if (!this.isModified('password')) next();

        var plainPassword = this.password;
        this.password = global.Crypto.SHA512(plainPassword);
        next();
    })

    return app.mongoose.model('User', UserSchema);;
};