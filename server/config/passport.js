var GoogleStrategy = require('passport-google-oauth2').Strategy;

var User = require('./../models/User');

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: "http://localhost:3000/auth/google/callback",
            passReqToCallback: true
        },
        function(request, accessToken, refreshToken, profile, done) {
            process.nextTick(function() {

                User.findOne({ 'google.id': profile.id }, function(err, user) {

                    if (err) return done(err);

                    if (user) {
                        return done(null, user);
                    } else {

                        var newUser = new User({
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName,
                            email: profile.email,
                            avatar: profile.photos.length ? profile.photos[0].value : null,
                            google: {
                                id: profile.id,
                                token: accessToken
                            }
                        });

                        newUser.save(function(err) {
                            if (err) throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });
        }
    ));


}