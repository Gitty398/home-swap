const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
    {
        streetAddress: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        numBedrooms: {
            type: Number,
            required: true,
            min: 1,
        },
        numBathrooms: {
            type: Number,
            required: true,
        },
        class: {
            type: String,
            required: true,
            enum: ["single-family home", "apartment", "multi-family", "Other"]
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        swappedRight: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        beachAccess: {
            type: Boolean,
        },
        poolAvailable: {
            type: Boolean,
        },
        petsAllowed: {
            type: Boolean,
        },
        image: String,
    },
    {
        timestamps: true,
    }
);

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;