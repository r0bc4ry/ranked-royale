var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var express = require('express');
var flash = require('express-flash');
var LocalStrategy = require('passport-local').Strategy;
var logger = require('morgan');
var path = require('path');
var passport = require('passport');
var session = require('express-session');

var app = express();

// Model setup
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rankedroyale', {
    useCreateIndex: true,
    useNewUrlParser: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongoose Connection Error:'));

// Passsport setup
app.use(session({
    secret: '{#fFT"5pZ>LvD#N:',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

var User = require('./models/user');
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (username, password, done) {
        User.findOne({email: username}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            if (!user.verifyPassword(password)) {
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

// View engine setup
var apiRouter = require('./routes/api');
var authRouter = require('./routes/auth');
var indexRouter = require('./routes/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/auth', authRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
