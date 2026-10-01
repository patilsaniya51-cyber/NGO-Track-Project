const mongoose = require("mongoose");

const beneficiarySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        contact: {
            type: String,
            default: ""
        },
        date: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Beneficiary", beneficiarySchema);