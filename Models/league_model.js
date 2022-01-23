const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leagueSchema = new Schema({
    league: {
        type: String,
        require: true
    },
    nationality:{
        type: String,
        required: true
    },
    apiID:{
        type: String,
        required: true
    }
});

const League = new mongoose.model("League", leagueSchema);

module.exports = League;