var express = require('express');
var session = require('express-session')
var cors = require('cors');
var bodyParser = require('body-parser')

var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://aa:bb@ds044699.mlab.com:44699/cc');
mongoose.connection.on('error', console.error);

var User = require('./models/User');
var Task = require('./models/Task');

app.use(cors());
app.options('*', cors());
app.use(session({ secret: 'no' }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/user', function(req, res) {
    User.findOne({
        firstName: 'Igor'
    }, function(err, user) {
        res.send(user);
    })
});

app.get('/tasks/:id', function(req, res) {
    Task.find({ 'user': req.params.id }).exec(function(err, tasks) {
        res.send(tasks);
    });
});

app.post('/tasks', function(req, res) {
    Task.update({ _id: req.body._id }, req.body, { upsert: true }, function(err, task) {
        res.send(task);
    });
})

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

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});