const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const flash = require('connect-flash');
const logger = require('morgan');
const path = require('path');

const app = express();
app.locals.env = process.env;

// Mongoose setup
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongoose Connection Error:'));

// Redis setup
const redis = process.env.NODE_ENV === 'development' ? require('redis-mock') : require('redis');
const client = redis.createClient({
    url: process.env.REDIS_URL
});

// Passsport setup
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

app.use(session({
    store: new RedisStore({
        client: client,
        logErrors: true
    }),
    secret: '{#fFT"5pZ>LvD#N:',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const epicGamesController = require('./controllers/epic-games-controller');
const User = require('./models/user');
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
            epicGamesController.getProfile(user.epicGamesAccount.id).then(function (profile) {
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
const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');

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

// Set up a route to redirect http to https
app.use(function (req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV === 'production') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
});

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
