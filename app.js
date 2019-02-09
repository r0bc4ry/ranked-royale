const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');

const flash = require('connect-flash');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

var app = express();
app.locals.env = process.env;

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
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const epicGamesLauncher = require('./controllers/epic-games-controller');

var User = require('./models/user');
passport.use(new LocalStrategy(function (username, password, done) {
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
        // Update user's Epic Games account information if it exists
        if (user.epicGamesAccount) {
            epicGamesLauncher.getProfile(user.epicGamesAccount.id).then(function (profile) {
                user.displayName = profile.display_name;
                user.save(function (err) {
                    if (err) {
                        return done(err);
                    }
                    return done(null, user);
                });
            });
        } else {
            return done(null, user);
        }
    });
}));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});


// View engine setup
var apiRouter = require('./routes/api');
var authRouter = require('./routes/auth');
var indexRouter = require('./routes/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

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
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
