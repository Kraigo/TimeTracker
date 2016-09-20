var express = require('express');
var router = express.Router();
var appRoot = require('app-root-path');
var Team = require(appRoot + '/server/models/Team');
var Task = require(appRoot + '/server/models/Task');

router.get('/projects', function(req, res) {
    Team.find({ users: req.session.passport.user },
        function(err, teams) {
            var projects = teams.reduce(function(result, team) {
                return result.concat(team.projects);
            }, [])
            res.send(projects);
        })
});

router.post('/projects', function(req, res) {
    var data = {
        title: req.body.title
    }
    Team.findOneAndUpdate({ _id: req.body.team }, { $push: { projects: data } }, { new: true },
        function(err, team) {
            res.send(team.projects);
        })
});

router.delete('/projects/:id', function(req, res) {

    Team.findOneAndUpdate({ 'projects._id': req.params.id }, { $pull: { projects: { _id: req.params.id } } },
        function(err, team) {
            Task.find({ project: req.params.id }).remove().exec(function(err, task) {
                res.send();
            })
        })
});

module.exports = router;