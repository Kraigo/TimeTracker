var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var shema = new mongoose.Schema({
    team: {
        type: ObjectId,
        ref: 'Team'
    },
    email: string
});

var Model = mongoose.model('Invitation', shema);

module.exports = Model;