const express = require('express');
const {check, validationResult} = require('express-validator/check');
const Mailchimp = require('mailchimp-api-v3');
const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY);
const passport = require('passport');
const randomstring = require('randomstring');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const User = require('../models/user');

router.get('/signup', function (req, res, next) {
    res.render('auth/signup', {title: 'Sign Up', errorMessages: req.flash('error')});
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
            });
        });
    });
});

router.get('/login', function (req, res, next) {
    res.render('auth/login', {title: 'Log In', errorMessages: req.flash('error')});
});

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/auth/login',
    failureFlash: 'Invalid username or password.'
}), function (req, res, next) {
    let redirectTo = req.session.redirectTo || '/';
    delete req.session.redirectTo;
    res.redirect(redirectTo);
});

router.get('/forgot-password', function (req, res, next) {
    res.render('auth/forgot-password', {
        title: 'Forgot Password',
        infoMessages: req.flash('info'),
        errorMessages: req.flash('error')
    });
});

router.post('/forgot-password', [
    check('username').isEmail().normalizeEmail().withMessage('Invalid email.')
], function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(function (error) {
            req.flash('error', error.msg);
        });
    }
    if (Object.entries(req.flash()).length > 0) {
        return res.redirect('/auth/forgot-password');
    }

    User.findOne({email: req.body.username}, async function (err, user) {
        if (!user) {
            req.flash('error', 'No user with that email address exists.');
            return res.redirect('/auth/forgot-password');
        }

        let myrandomstring = randomstring.generate({
            charset: 'hex'
        });

        user.resetPasswordToken = myrandomstring;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        let resetPasswordUrl = `${req.protocol}://${req.get('host')}/auth/reset-password/${myrandomstring}`;
        await sgMail.send({
            to: user.email,
            from: {
                name: 'Ranked Royale',
                email: 'contact@rankedroyale.com',
            },
            subject: 'Password Reset',
            text: `Someone (hopefully you) has asked us to reset the password for your Ranked Royale account. Please click the link below, or paste it into your browser, to complete the process: ${resetPasswordUrl} If you did not make this request, please ignore this email and your password will remain unchanged.`,
            html: `<p>Hello,</p><p>Someone (hopefully you) has asked us to reset the password for your Ranked Royale account.</p><p>Please click the link below, or paste it into your browser, to complete the process:</p><p><a href="${resetPasswordUrl}" target="_blank">${resetPasswordUrl}</a></p><p>If you did not make this request, please ignore this email and your password will remain unchanged.</p>`,
        });

        req.flash('info', `An email has been sent to ${user.email} with further instructions.`);
        return res.redirect('/auth/forgot-password');
    })
});

router.get('/reset-password/:token', function (req, res, next) {
    User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {
            $gt: Date.now()
        }
    }, function (err, user) {
        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/auth/forgot-password');
        }

        res.render('auth/reset-password', {
            token: req.params.token,
            errorMessages: req.flash('error')
        });
    });
});

router.post('/reset-password/:token', [
    check('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long.')
], function (req, res, next) {
    if (req.body.password !== req.body.confirmPassword) {
        req.flash('error', 'Passwords must match.');
        return res.redirect(`/auth/reset-password/${req.params.token}`);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(function (error) {
            req.flash('error', error.msg);
        });
    }
    if (Object.entries(req.flash()).length > 0) {
        return res.redirect(`/auth/reset-password/${req.params.token}`);
    }

    User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {
            $gt: Date.now()
        }
    }, async function (err, user) {
        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/auth/forgot-password');
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        await sgMail.send({
            to: user.email,
            from: {
                name: 'Ranked Royale',
                email: 'contact@rankedroyale.com',
            },
            subject: 'Password Reset Confirmation',
            text: 'This is a confirmation that your account password has been changed.',
            html: '<p>Hello,</p><p>This is a confirmation that your account password has been changed.</p>',
        });

        req.login(user, function (err) {
            if (err) {
                throw err;
            }

            return res.redirect('/');
        });
    });
});

router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
