var express = require('express');
var router = express.Router();
var appRoot = require('app-root-path');
var Team = require(appRoot + '/server/models/Team');
var User = require(appRoot + '/server/models/User');

router.get('/teams', function(req, res) {
    Team.find({ users: req.session.passport.user }).populate(['users', 'projects']).exec(function(err, teams) {

        // var transformedTeams = teams.map(function(team) {
        //     team.isOwner = req.session.passport.user === team.owner;
        //     return team;
        // });

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

router.get('/invitations', function(req, res) {
    User.findById(req.session.passport.user, function(err, user) {

        Team.find({ 'invitations.email': user.email }, function(err, teams) {
            var invitations = teams.map(function(team) {
                return {
                    _id: team.invitations.filter(item => item.email === user.email)[0]._id,
                    team: team.title
                }
            })
            res.send(invitations)
        })

    })
});
router.post('/invitations', function(req, res) {
    var condition = {
        _id: req.body.team
    };

    var data = {
        $push: {
            invitations: {
                email: req.body.email
            }
        }
    }

    Team.findOneAndUpdate(condition, data, function(err, team) {
        res.send(team);
    });
});

router.put('/invitations/accept', function(req, res) {
    var condition = {
        'invitations._id': req.body.id
    };

    var data = {
        $pull: {
            invitations: { _id: req.body.id }
        },
        $push: {
            users: req.session.passport.user
        }
    }

    Team.findOneAndUpdate(condition, data, function(err, team) {
        res.send(team);
    });
})
module.exports = router;