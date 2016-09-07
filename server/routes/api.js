var express = require('express');
var passport = require('passport');

var User = require('./../models/User');
var Task = require('./../models/Task');
var Team = require('./../models/Team');
var Project = require('./../models/Project');

var router = express.Router();

router.get('/', function(req, res) {
    res.send('Api page');
});

router.get('/user', function(req, res) {
    User.findOne({
        _id: req.session.passport.user
    }, function(err, user) {
        res.send(user);
    })
});

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

router.get('/teams', function(req, res) {
    Team.find({ users: req.session.passport.user }).populate(['users', 'projects']).exec(function(err, teams) {
        res.send(teams);
    });
});
router.post('/teams', function(req, res) {
    var data = {
        title: req.body.title,
        owner: req.session.passport.user,
        users: [req.session.passport.user]
    }
    Team.create(data, function(err, team) {
        Team
            .findById(team._id)
            .populate(['users', 'projects'])
            .exec(function(err, team) {
                res.send(team);
            })
    });
});

router.post('/projects', function(req, res) {
    var data = {
        title: req.body.title
    }
    Project.create(data, function(err, project) {
        Team.findByIdAndUpdate(
            req.body.team, { $push: { projects: project._id } },
            function(err, team) {
                res.send(team);
            })
    });
});
router.delete('/projects/:id', function(req, res) {    
    Project.findById(req.params.id, function(err, project) {
        project.remove(function() {
            res.send();
        })
    });
});

module.exports = router;