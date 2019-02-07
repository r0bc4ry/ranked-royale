const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Stat = new Schema({
    userId: {
        type: ObjectId,
        required: true
    },
    matchId: {
        type: ObjectId,
        required: true
    },
    solo: {
        score: {
            type: Number,
            required: true
        },
        minutesPlayed: {
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
        placeTop1: {
            type: Number,
            required: true
        },
        placeTop10: {
            type: Number,
            required: true
        },
        placeTop25: {
            type: Number,
            required: true
        },
        lastModified: {
            type: Date,
            required: true
        }
    },
    duo: {
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
        },
        lastModified: {
            type: Date,
            required: true
        }
    },
    squad: {
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
        placeTop3: {
            type: Number,
            required: true
        },
        placeTop6: {
            type: Number,
            required: true
        },
        lastModified: {
            type: Date,
            required: true
        }
    }
}, {timestamps: true});

module.exports = mongoose.model('Stat', Stat);
