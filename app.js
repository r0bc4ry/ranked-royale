const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const flash = require('connect-flash');
const logger = require('morgan');
const path = require('path');
const sslRedirect = require('heroku-ssl-redirect');

const app = express();
app.locals.env = process.env;

// Mongoose setup
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongoose connection error:'));
db.once('open', function () {
    console.log('Mongoose connected.')
});

// Redis setup
const redis = require('redis');
const redisClient = redis.createClient({url: process.env.REDIS_URL});

// Epic Games setup
const epicGamesController = require('./controllers/epic-games-controller');

// Passsport setup
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

app.use(session({
    store: new RedisStore({
        client: redisClient,
        logErrors: true
    }),
    secret: '{#fFT"5pZ>LvD#N:',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const User = require('./models/user');
passport.use(new LocalStrategy(function (username, password, done) {
    User.findOne({email: username}, async function (err, user) {
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
            let profile = await epicGamesController.getProfile(user.epicGamesAccount.id);
            user.epicGamesAccount.displayName = profile.displayName;
            user.epicGamesAccount.id = profile.id;
            user.epicGamesAccount.jid = profile.jid;
            await user.save();
        }
        return done(null, user);
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

// Enable SSL redirect
app.use(sslRedirect());

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
