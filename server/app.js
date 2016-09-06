var cors = require('cors');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;
var app = express();

mongoose.connect(process.env.MONGO_DB);
mongoose.connection.on('error', console.error);

require('./config/passport')(passport);

app.use(cors());
app.options('*', cors());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
    secret: 'hardworking',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));
app.use(passport.initialize());
app.use(passport.session());

//

var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");

var webpackConfig = require('../webpack.config');
webpackConfig.output = {
    path: '/'
}

app.use(webpackDevMiddleware(webpack(webpackConfig), { quiet: false }));

//

app.use('/', express.static(__dirname + '/../public'));

app.use('/auth', require('./routes/auth'));

app.use('/api', isLoggedIn, require('./routes/api'));

app.listen(port, function() {
    console.log('Example app listening on port', port);
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.status(401);
    res.send('No Authorization');
}