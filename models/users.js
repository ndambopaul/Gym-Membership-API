const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    first_name: String,
    last_name: String,
    role: {
        type: String,
        enum: ["admin", "member"],
        default: "admin"
    },
    active: {
        type: Boolean,
        default: true
    },
    date_created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", UserSchema);