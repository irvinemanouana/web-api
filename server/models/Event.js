"use strict";

module.exports = function(app){

    var EventSchema = new app.mongoose.Schema({
        title: { 
            type: String,
            require: true,
            unique: true
        },
        category: {
            type : app.mongoose.Schema.ObjectId, 
            ref : 'Category',
            require: true
        },
        creator: {
            type : app.mongoose.Schema.ObjectId, 
            ref : 'User',
            require: true
        },
        description: {
            type: String,
            require: true
        },
        date: {
            type: Date,
            require: true
        },
        members: {
            type : [app.mongoose.Schema.ObjectId], 
            ref : 'User'
        },
        logo: {
            type: String
        }
    });

    EventSchema.plugin(require('mongoose-timestamp'));

    EventSchema.pre('save', function (next) {
        this.members.push(this.creator);
        next();
    })

    return app.mongoose.model('Event', EventSchema);;
};