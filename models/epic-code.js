const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EpicCodeSchema = new Schema({
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
