var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var shema = new mongoose.Schema({
    time: Number,
    date: Date,
    description: String,
    project: {
        type: ObjectId,
        ref: "Project"
    },
    category: {
        type: ObjectId,
        ref: "Category"
    },
    user: {
        type: ObjectId,
        ref: 'User'
    },
    lastTrack: Date,
    isTracking: Boolean
});

var Model = mongoose.model('Task', shema);

module.exports = Model;