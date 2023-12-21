const mongoose = require("mongoose");
const { type } = require("os");
const playerSchema = mongoose.Schema({
    playerName: String,
    number: Number,
    team: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Team"
    },
    position: String,
    age: Number
});
const player = mongoose.model("Player", playerSchema);
module.exports = player;