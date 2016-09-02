var mongoose = require('mongoose');

var shema = new mongoose.Schema({
    firstName: String,
    lastName: String
});

var Model = mongoose.model('User', shema);

module.exports = Model;