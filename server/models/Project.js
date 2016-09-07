var mongoose = require('mongoose');

var shema = new mongoose.Schema({
    title: String
});

shema.pre('remove', function(next) {
    var project = this;
    project.model('Task').remove({project: project._id}, next)
});

var Model = mongoose.model('Project', shema);

module.exports = Model;