var express = require('express');
var passport = require('passport');

var User = require('./../models/User');
var Task = require('./../models/Task');

var router = express.Router();

router.get('/', function(req, res) {
    res.send('Api page');
});

router.get('/user', function(req, res) {
    User.findOne({
        firstName: 'Igor'
    }, function(err, user) {
        res.send(user);
    })
});

router.get('/tasks/:id', function(req, res) {
    Task.find({ 'user': req.params.id }).exec(function(err, tasks) {
        res.send(tasks);
    });
});

router.post('/tasks', function(req, res) {
    var data = req.body;

    Task.create(data, function(err, task) {
        res.send(task);
    });
});

router.put('/tasks/:id', function(req, res) {
    var data = req.body;
    var condition = { _id: req.params.id };

    Task.update(condition, data, function(err, task) {
        res.send(task);
    });
});

router.delete('/tasks/:id', function(req, res) {
    var condition = { _id: req.params.id };

    Task.find(condition).remove().exec(function(err, task) {
        res.send(task);
    });
});

module.exports = router;