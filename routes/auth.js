const express = require('express');
const {check, validationResult} = require('express-validator/check');
const Mailchimp = require('mailchimp-api-v3');
const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY);
const passport = require('passport');
const router = express.Router();

const User = require('../models/user');

router.get('/signup', function (req, res, next) {
    res.render('auth/signup', {title: 'Sign Up', messages: req.flash('error')});
});

router.post('/signup', [
    check('username').isEmail().normalizeEmail().withMessage('Invalid email.'),
    check('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long.')
], function (req, res, next) {
    if (!req.body.firstName) {
        req.flash('error', 'First name required.');
    }
    if (!req.body.lastName) {
        req.flash('error', 'Last name required.');
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(function (error) {
            req.flash('error', error.msg);
        });

    }
    if (Object.entries(req.flash()).length > 0) {
        return res.redirect('/auth/signup');
    }

    User.findOne({email: req.body.username}, function (err, user) {
        if (err) {
            throw err;
        }
        if (user) {
            req.flash('error', `User '${req.body.username}' already exists.`);
            return res.redirect('/auth/signup');
        }
        User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.username,
            password: req.body.password
        }, function (err, user) {
            if (err) {
                throw err;
            }

            // Add user to MailChimp list
            mailchimp.post(`/lists/${process.env.MAILCHIMP_LIST_ID}/members`, {
                email_address: user.email,
                status: 'subscribed',
                merge_fields: {
                    "FNAME": user.firstName,
                    "LNAME": user.lastName
                }
            }).catch(function (err) {
                console.error(`User "${user._id}" unable to subscribe to MailChimp list.`);
                console.error(err);
            });

            // Login user
            req.login(user, function (err) {
                if (err) {
                    throw err;
                }

                return res.redirect('/');
            })
        });
    });
});

router.get('/login', function (req, res, next) {
    res.render('auth/login', {title: 'Log In', messages: req.flash('error')});
});

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/auth/login',
    failureFlash: 'Invalid username or password.'
}), function (req, res, next) {
    res.redirect('/');
});

router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
