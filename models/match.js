const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Match = new Schema({
    sessionId: {
        type: String,
        required: true
    },
    gameMode: {
        type: String,
        enum: ['solo', 'duo', 'squad'],
        required: true
    },
    season: {
        type: Number,
        required: true
    },
    numStartingPlayers: {
        type: Number,
        required: true
    },
    hasEnded: {
        type: Boolean,
        required: true,
        default: false
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }]
}, {timestamps: true});

module.exports = mongoose.model('Match', Match);
