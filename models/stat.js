const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Stat = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    matchId: {
        type: Schema.Types.ObjectId,
        ref: 'Match',
        required: true
    },
    eloDelta: {
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
    playersOutLived: {
        type: Number,
        required: true
    },
    placeTop1: {
        type: Boolean,
        required: true
    },
    // Solo specific stats
    placeTop25: {
        type: Boolean
    },
    placeTop10: {
        type: Boolean
    },
    // Duos specific stats
    placeTop12: {
        type: Boolean
    },
    placeTop5: {
        type: Boolean
    },
    // Squads specific stats
    placeTop6: {
        type: Boolean
    },
    placeTop3: {
        type: Boolean
    }
}, {timestamps: true});

module.exports = mongoose.model('Stat', Stat);
