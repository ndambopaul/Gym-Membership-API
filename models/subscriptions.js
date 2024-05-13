const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    },
    package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package'
    },
    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "quarterly", "semi-annually", "yearly"]
    },
    status: {
        type: String,
        enum: ["Pending", "Active", "Cancelled", "Paused"],
        default: "Active"
    },
    start_date: Date,
    end_date: Date,
    premium: Number,
    date_created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Subscription", SubscriptionSchema);