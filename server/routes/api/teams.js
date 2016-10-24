var express = require('express');
var router = express.Router();
var appRoot = require('app-root-path');
var Team = require(appRoot + '/server/models/Team');

router.get('/teams', function(req, res) {
    Team.find({ users: req.session.passport.user }).populate(['users']).lean().exec(function(err, teams) {

        var transformedTeams = teams.map(function(team) {
            team.isOwner = req.session.passport.user === team.owner.toString();
            return team;
        });
        res.send(transformedTeams);
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
            .populate(['users'])
            .exec(function(err, team) {
                res.send(team);
            })
    });
});

router.delete('/teams/:id', function(req, res) {
    Team.findByIdAndRemove(req.params.id, function(err, team) {
        res.send(req.params.id);
    })
});

router.put('/teams/leave', function(req, res) {
    Team.findByIdAndUpdate(req.body.team,
        { $pull: { users: req.body.user } },
        function(err, team) {
            res.send(req.body.user);
        })
});

module.exports = router;