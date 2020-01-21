const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    dob: {
        type: Date
    },
    skills: {
        type: [String]
    },
    location: {
        type: String
    }

});

module.exports = User = mongoose.model('user',UserSchema);