var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var shema = new mongoose.Schema({
    title: String,
    owner: ObjectId,
    projects: [{
        title: String
    }],
    categories: [{
        title: String
    }],
    users: [{
        type: ObjectId,
        ref: "User"
    }],
    invitations: [{
        email: String,
        accepted: {
            type: String,
            default: false
        }
    }],
    administrators: [{
        type: ObjectId,
        ref: "User"
    }]
});

var Model = mongoose.model('Team', shema);

module.exports = Model;