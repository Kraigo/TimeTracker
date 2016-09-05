var express = require('express');
// var session = require('express-session')
// var MongoStore = require('connect-mongo')(session);
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB);
mongoose.connection.on('error', console.error);

var User = require('./models/User');
var Task = require('./models/Task');

app.use(cors());
app.options('*', cors());
// app.use(session({
//     store: new MongoStore({ mongooseConnection: mongoose.connection })
// }));
// http://nodeguide.ru/doc/dailyjs-nodepad/node-tutorial-5/
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(__dirname + '/../public'));

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
    var data = req.body;

    Task.create(data, function(err, task) {
        res.send(task);
    });
});

app.put('/tasks/:id', function(req, res) {
    var data = req.body;
    var condition = { _id: req.params.id };

    Task.update(condition, data, function(err, task) {
        res.send(task);
    });
});

app.delete('/tasks/:id', function(req, res) {
    var condition = { _id: req.params.id };

    Task.find(condition).remove().exec(function(err, task) {
        res.send(task);
    });
});

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