var cors = require('cors');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

var port = process.env.PORT || 3000;
var app = express();

var distFolder = process.env.NODE_ENV === 'development' ? '/debug' : '/dist';

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

app.use(favicon(__dirname + '/../public/favicon.ico'));
app.use('/', express.static(__dirname + '/../public' + distFolder));



app.use('/auth', require('./routes/auth'));

app.use('/api', isLoggedIn, require('./routes/api'));

app.get('/[^\.]+$', function(req, res, next) {
    res.sendfile("index.html", { root: __dirname + '/../public/dist' });
});

app.listen(port, function() {
    console.log('Example app listening on port', port);
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.status(401);
    res.send('No Authorization');
}