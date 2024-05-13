const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    phone_number: String,
    id_number: String,
    is_active: {
        type: Boolean,
        default: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female"]
    },
    date_created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Member", MemberSchema);