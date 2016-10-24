var express = require('express');
var router = express.Router();
var appRoot = require('app-root-path');
var User = require(appRoot + '/server/models/User');
var Team = require(appRoot + '/server/models/Team');

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
        _id: req.body.team,
        'invitations.email': { $ne: req.body.email}
    };

    var data = {
        $push: {
            invitations: {
                email: req.body.email
            }
        }
    }

    Team.findOneAndUpdate(condition, data, { new: true }, function(err, team) {
        res.send(team.invitations.filter(a => a.email === req.body.email )[0]);
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

    Team.findOneAndUpdate(condition, data, { new: true }).populate(['projects', 'users']).exec(function(err, team) {
        res.send(team);
    });
})

router.delete('/invitations/:id', function(req, res) {
    Team.findOneAndUpdate({'invitations._id': req.params.id}, 
        { $pull: { invitations: { _id: req.params.id } } },
        function(err, team) {
            res.send(req.params.id);
        });
})

module.exports = router;