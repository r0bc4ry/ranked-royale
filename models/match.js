const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Match = new Schema({
    code: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['solo', 'duo', 'squad'],
        required: true
    },
    players: [{
        userId: {
            type: ObjectId,
            required: true
        },
        epicGamesAccountId: {
            type: String,
            required: true
        }
    }]
}, {collection: 'matches', timestamps: true});

module.exports = mongoose.model('Match', Match);
