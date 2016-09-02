var mongoose = require('mongoose');
mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds044699.mlab.com:44699/<dbname>');
mongoose.connection.on('error', console.error);

var User = require('./models/User');
var Task = require('./models/Task');

// var user = new User({
//     firstName: 'Igor',
//     lastName: 'x'
// })

// user.save(function(err, user) {
//     if (err) console.log(err);
//     console.log(user);
// })

// User.findOne({
//     firstName: 'Igor'
// }, function(err, user) {
//     console.log(user._id);

//     var task = new Task({
//         time: 0,
//         description: 'Test',
//         user: user._id
//     })

//     task.save(function(err, task) {
//         if (err) console.log(err);
//         console.log('TaskSaved');
//     })
// })

// Task.find({}).populate('user').exec(function(err, tasks) {
//     console.log(tasks);
// })