var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var shema = new mongoose.Schema({
    time: Number,
    date: Date,
    description: String,
    category: String,
    user: { type: ObjectId, ref: 'User' }
});

var Model = mongoose.model('Task', shema);

module.exports = Model;