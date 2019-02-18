const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Match = new Schema({
    eventTime: {
        type: Date,
        required: true
    },
    serverId: {
        type: String,
        validate: {
            validator: function (v) {
                return /[a-z0-9]{3}/.test(v);
            },
            message: props => `${props.value} is not valid.`
        },
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
    hasEnded: {
        type: Boolean,
        required: true,
        default: false
    },
    users: {
        type: [ObjectId],
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Match', Match);
