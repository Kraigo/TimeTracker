var express = require('express');
var router = express.Router();
var appRoot = require('app-root-path');
var Team = require(appRoot + '/server/models/Team');

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

module.exports = router;