const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
    {
        donorName: {
            type: String,
            required: true
        },

        type: {
            type: String,
            required: true
        },

        amount: {
            type: Number,
            default: 0
        },

        quantity: {
            type: Number,
            default: 0
        },

        unit: {
            type: String,
            default: ""
        },

        date: {
            type: String,
            required: true
        },

        purpose: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Donation", donationSchema);