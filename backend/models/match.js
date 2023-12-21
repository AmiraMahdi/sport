// import mongoose
const mongoose = require("mongoose");
//  schema
const matchSchema = mongoose.Schema({
    teamOne: String,
    teamTwo: String,
    scoreOne: Number,
    scoreTwo: Number,
});
// match model
const match = mongoose.model("Match",matchSchema);
// exportable
module.exports=match;