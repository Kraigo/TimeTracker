var express = require('express');
var router = express.Router();
var appRoot = require('app-root-path');
var Task = require(appRoot + '/server/models/Task');

router.get('/tasks', function(req, res) {
    Task.find({ 'user': req.session.passport.user }).populate('project').exec(function(err, tasks) {
        res.send(tasks);
    });
});

router.post('/tasks', function(req, res) {
    var data = req.body;
    data.user = req.session.passport.user;

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