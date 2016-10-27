var express = require('express');
var router = express.Router();
var appRoot = require('app-root-path');
var Team = require(appRoot + '/server/models/Team');
var Task = require(appRoot + '/server/models/Task');

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
                team.isOwner = req.session.passport.user === team.owner.toString();
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

router.get('/teams/:id/activity', function(req,res) {
    var dateFrom = new Date();
    var dateTo = new Date();

    dateFrom.setHours(dateFrom.getHours() - 24);
    
    
    Team.findById(req.params.id, function(err, team) {

        Task.find({
                project: {$in: team.projects.map(p => p._id)},
                date: {$gte: dateFrom, $lt: dateTo}
            })
            .sort({user: 'asc'})
            .populate('user')
            .exec(function(err, tasks) {
                res.send(tasks);
            })
    })

    
    
})

module.exports = router;