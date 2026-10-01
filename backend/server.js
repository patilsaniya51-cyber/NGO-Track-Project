const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Donation = require("./models/Donation");
const Beneficiary = require("./models/Beneficiary");
const Utilization = require("./models/Utilization");

const app = express();

app.use(cors());
app.use(express.json());


// =========================================
// HOME
// =========================================

app.get("/", (req, res) => {
    res.send("NGO Track Backend is running!");
});


// =========================================
// DONATIONS
// =========================================

app.post("/api/donations", async (req, res) => {
    try {
        const donation = new Donation(req.body);

        const savedDonation = await donation.save();

        res.status(201).json(savedDonation);

    } catch (error) {

        res.status(500).json({
            message: "Failed to save donation",
            error: error.message
        });
    }
});


// =========================================
// BENEFICIARIES
// =========================================

app.post("/api/beneficiaries", async (req, res) => {
    try {
        const beneficiary = new Beneficiary(req.body);

        const savedBeneficiary =
            await beneficiary.save();

        res.status(201).json(savedBeneficiary);

    } catch (error) {

        res.status(500).json({
            message: "Failed to save beneficiary",
            error: error.message
        });
    }
});


// =========================================
// FUND UTILIZATION
// =========================================

app.post("/api/utilizations", async (req, res) => {
    try {
        const utilization =
            new Utilization(req.body);

        const savedUtilization =
            await utilization.save();

        res.status(201).json(savedUtilization);

    } catch (error) {

        res.status(500).json({
            message: "Failed to save utilization",
            error: error.message
        });
    }
});


// =========================================
// START SERVER
// =========================================

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI)

    .then(() => {

        console.log(
            "MongoDB connected successfully!"
        );

        app.listen(PORT, () => {

            console.log(
                `NGO Track backend running on http://localhost:${PORT}`
            );

        });

    })

    .catch((error) => {

        console.error(
            "MongoDB connection failed:"
        );

        console.error(error.message);

    });