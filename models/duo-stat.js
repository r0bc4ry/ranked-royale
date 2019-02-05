const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var DuoStat = new Schema({
    userId: {
        type: ObjectId,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    kills: {
        type: Number,
        required: true
    },
    matchesPlayed: {
        type: Number,
        required: true
    },
    minutesPlayed: {
        type: Number,
        required: true
    },
    placeTop1: {
        type: Number,
        required: true
    },
    placeTop5: {
        type: Number,
        required: true
    },
    placeTop12: {
        type: Number,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('DuoStat', DuoStat);
