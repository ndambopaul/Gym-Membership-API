const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema({
    name: String,
    services: Array,
    monthly_cost: Number,
    daily_cost: Number,
    date_created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Package", PackageSchema);