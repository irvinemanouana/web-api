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
            min: Date.now,
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
        var self = this;

        if (!this.isModified('creator')) next();

        self.members.push(self.creator);
        next();
    });

    return app.mongoose.model('Event', EventSchema);;
};