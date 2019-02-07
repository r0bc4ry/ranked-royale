const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Match = new Schema({
    code: {
        type: String,
        validate: {
            validator: function (v) {
                return /[a-z0-9]{3}/.test(v);
            },
            message: props => `${props.value} is not a valid code.`
        },
        required: true
    },
    gameMode: {
        type: String,
        enum: ['solo', 'duo', 'squad'],
        required: true
    },
    users: {
        type: [ObjectId]
    }
}, {timestamps: true});

module.exports = mongoose.model('Match', Match);
