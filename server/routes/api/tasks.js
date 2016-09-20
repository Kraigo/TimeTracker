var express = require('express');
var router = express.Router();
var appRoot = require('app-root-path');
var Task = require(appRoot + '/server/models/Task');

router.get('/tasks', function(req, res) {
    var condition = {
        'user': req.session.passport.user
    }
    if (req.query.weekStart) {
        var weekDate = new Date(req.query.weekStart);
        var nextWeekDate = new Date(new Date(req.query.weekStart).setDate(weekDate.getDate() + 7));
        condition.date = {
            $gte: weekDate,
            $lt: nextWeekDate
        }
    }
    Task.find(condition).exec(function(err, tasks) {
        res.send(tasks);
    });
});

router.get('/tasks/active', function(req, res) {
    var condition = {
        'user': req.session.passport.user,
        'isTracking': true
    }
    Task.findOne(condition, function(err, task) {
        res.send(task);
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