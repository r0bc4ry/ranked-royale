require('dotenv').config();

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

let User = require('../models/user');

(async () => {
    await User.update({}, {
        $unset: {
            stats: 1
        }
    }, {multi: true}, function (err, data) {
        if (err) {
            return console.error(err);
        }
        console.log('Success.');
    });

    await User.update({}, {
        $set: {
            stats: {
                solo: {
                    rating: 1500,
                    matchesPlayed: 0,
                    minutesPlayed: 0,
                    kills: 0,
                    placeTop25: 0,
                    placeTop10: 0,
                    placeTop1: 0,
                    updatedAt: new Date()
                },
                duo: {
                    rating: 1500,
                    matchesPlayed: 0,
                    minutesPlayed: 0,
                    kills: 0,
                    placeTop12: 0,
                    placeTop5: 0,
                    placeTop1: 0,
                    updatedAt: new Date()
                },
                squad: {
                    rating: 1500,
                    matchesPlayed: 0,
                    minutesPlayed: 0,
                    kills: 0,
                    placeTop6: 0,
                    placeTop3: 0,
                    placeTop1: 0,
                    updatedAt: new Date()
                }
            }
        }
    }, {multi: true}, function (err, data) {
        if (err) {
            return console.error(err);
        }
        console.log('Success.');
    });

    process.exit();
})();
