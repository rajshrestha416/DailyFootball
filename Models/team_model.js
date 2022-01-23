const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    teamName: {
        type: String,
        require: true
    },
    league: {
        type: Schema.Types.ObjectId,
        ref:'League',
        required: true
    },
    apiID:{
        type: String,
        required: true
    }
});

const Team = new mongoose.model("Team", teamSchema);

module.exports = Team;