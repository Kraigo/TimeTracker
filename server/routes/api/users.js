var express = require('express');
var router = express.Router();
var appRoot = require('app-root-path');
var User = require(appRoot + '/server/models/User');

router.get('/user', function(req, res) {
    User.findById(req.session.passport.user, function(err, user) {
        res.send(user);
    })
});

module.exports = router;