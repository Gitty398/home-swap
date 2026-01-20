const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing");

// INDUCES

router.get("/", (req, res) => {
    res.render("/")
});





module.exports = router;