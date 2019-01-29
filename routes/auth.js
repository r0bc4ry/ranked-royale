var express = require('express');
const LocalStrategy = require('passport-local');
const passport = require('passport');
var router = express.Router();
const Scout = require('@scoutsdk/server-sdk');

// import jwt from 'jsonwebtoken';
var User = require('../models/user');


router.get('/signup', function (req, res, next) {
    res.render('auth/signup');
});

router.post('/signup', function (req, res, next) {
    User.findOne({email: req.body.username}, function (err, user) {
        if (err) {
            throw err;
        }
        if (user) {
            res.json({
                status: 'error',
                message: 'User already exists.'
            });
        }
        User.create({
            email: req.body.username,
            password: req.body.password
        }, function (err, user) {
            if (err) {
                throw err;
            }
            console.log('Saved!');
        });
    });
});

router.get('/login', function (req, res, next) {
    res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {failureRedirect: '/auth/login'}), function (req, res, next) {
    res.redirect('/');
});

router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});

router.post('/scout', async function (req, res, next) {
    await Scout.configure({
        clientId: 'e04cefab-172d-44bd-b3cb-5836b30f31cf',
        clientSecret: '82348932a170faa9f5facc6489567573d0918856422f75fe7323b77b989e6779',
        scope: 'public.read'
    });

    let titles = await Scout.titles.list();
    let fortnite = titles.find(t => t.slug === 'fortnite');
    let search = await Scout.players.search('Rob13497', 'epic', 'pc', fortnite.id, true, true);
    let personaId = search.results[0].persona.id;

    let data = await Scout.verification.request(personaId, `${req.protocol + '://' + req.get('host')}/verification`, 'YOUR STATE HERE'); // The third param is your application’s representation of a user that isn’t publicly known, such as a session ID
    console.log(data);

    res.redirect(data.verificationUrl)

    // let playerId = search.results[0].player.playerId;
    // let player = await Scout.players.get(fortnite.id, playerId, '*');
    // console.log(player);
});

router.get('/scout/verify', async function (req, res, next) {
    await Scout.configure({
        clientId: 'e04cefab-172d-44bd-b3cb-5836b30f31cf',
        clientSecret: '82348932a170faa9f5facc6489567573d0918856422f75fe7323b77b989e6779',
        scope: 'public.read'
    });

    try {
        var decoded = jwt.verify(req.query.token, '82348932a170faa9f5facc6489567573d0918856422f75fe7323b77b989e6779');
    } catch (err) {
        // Validation failed (token is possibly forged)
    }
});

module.exports = router;
