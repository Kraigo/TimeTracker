var express = require('express');
var session = require('express-session');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var cors = require('cors');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

var mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_DB);
mongoose.connection.on('error', console.error);

var app = express();

app.use(cors());
app.options('*', cors());


// passport.serializeUser(function(user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function(obj, done) {
//     done(null, obj);
// });

// passport.use(new GoogleStrategy({
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: "http://yourdormain:3000/auth/google/callback",
//         passReqToCallback: true
//     },
//     function(request, accessToken, refreshToken, profile, done) {
//         process.nextTick(function() {
//             return done(null, profile);
//         });
//     }
// ));

// app.use(session({ secret: 'hardworking' }));
// app.use(passport.initialize());
// app.use(passport.session());

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.use('/', express.static(__dirname + '/../public'));

app.use('/auth', require('./routes/auth'));

app.use('/api', require('./routes/api'));

app.listen(port, function() {
    console.log('Example app listening on port', port);
});