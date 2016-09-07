var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var shema = new mongoose.Schema({
    title: String,
    owner: ObjectId,
    projects: [{
        type: ObjectId,
        ref: "Project"
    }],
    users: [{
        type: ObjectId,
        ref: "User"
    }]
});

var Model = mongoose.model('Team', shema);

module.exports = Model;