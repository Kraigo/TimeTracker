var mongoose = require('mongoose');

var shema = new mongoose.Schema({
    title: String
});

var Model = mongoose.model('Project', shema);

module.exports = Model;