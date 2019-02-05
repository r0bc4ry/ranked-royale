var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EpicCodeSchema = new Schema({
    code: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    epicGamesAccountId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('EpicCode', EpicCodeSchema);
