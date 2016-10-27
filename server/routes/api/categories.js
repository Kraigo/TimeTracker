var express = require('express');
var router = express.Router();
var appRoot = require('app-root-path');
var Team = require(appRoot + '/server/models/Team');
var Task = require(appRoot + '/server/models/Task');

router.get('/categories', function(req, res) {
    Team.find({ users: req.session.passport.user },
        function(err, teams) {
            var categories = teams.reduce(function(result, team) {
                return result.concat(team.categories);
            }, [])
            res.send(categories);
        })
});

router.post('/categories', function(req, res) {
    var data = {
        title: req.body.title
    }
    Team.findOneAndUpdate({ _id: req.body.team }, { $push: { categories: data } }, { new: true },
        function(err, team) {
            res.send(team.categories);
        })
});

router.delete('/categories/:id', function(req, res) {

    Team.findOneAndUpdate({ 'categories._id': req.params.id }, { $pull: { categories: { _id: req.params.id } } },
        function(err, team) {
            Task.find({ categories: req.params.id }).remove().exec(function(err, task) {
                res.send();
            })
        })
});

module.exports = router;