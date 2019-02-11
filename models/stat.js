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
    eloDelta: {
        type: Number,
        required: true
    },
    kills: {
        type: Number,
        required: true
    },
    placeTop1: {
        type: Boolean,
        required: true
    },
    // Solo specific stats
    placeTop10: {
        type: Boolean
    },
    placeTop25: {
        type: Boolean
    },
    // Duos specific stats
    placeTop5: {
        type: Boolean
    },
    placeTop12: {
        type: Boolean
    },
    // Squads specific stats
    placeTop3: {
        type: Boolean
    },
    placeTop6: {
        type: Boolean
    }
}, {timestamps: true});

module.exports = mongoose.model('Stat', Stat);
