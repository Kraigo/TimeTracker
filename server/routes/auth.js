var express = require('express');
var passport = require('passport');

var router = express.Router();

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/#/login');
})

router.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

module.exports = router