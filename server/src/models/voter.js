const mongoose = require("mongoose");

const voterModel = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    electionId: { type: String, required: true },
    password: { type: String, required: true }
}, {
    timestamps: true
})
module.exports = mongoose.model('Voter', voterModel)
