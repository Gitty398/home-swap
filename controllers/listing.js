const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing");

// INDUCES

router.get("/", async (req, res) => {
    const listings = await Listing.find({});
    res.render("listings/index.ejs", { listings });
});


module.exports = router;