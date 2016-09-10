var express = require('express');
var router = express.Router();
var appRoot = require('app-root-path');
var Projects = require(appRoot + '/server/models/Project');
var Team = require(appRoot + '/server/models/Team');

router.post('/projects', function(req, res) {
    var data = {
        title: req.body.title
    }
    Project.create(data, function(err, project) {
        Team.findOneAndUpdate({ _id: req.body.team }, { $push: { projects: project._id } },
            function(err, team) {
                res.send(project);
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