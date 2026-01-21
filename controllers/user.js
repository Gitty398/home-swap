const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing");

// INDUCES

// Index
router.get("/", (req, res) => {
    res.render("/")
});

// Show /users/myprofile

router.get("/myprofile", async (req, res) => {
    try {
        const myHomes = await Listing.find({ owner: req.session.user._id, }).populate("owner");

        const swappedRightHomes = await Listing.find({ swappedRight: req.session.user._id, }).populate("owner")

        res.render("users/show.ejs", { myHomes, swappedRightHomes })

    } catch (error) {
        req.session.message = error.message;
        req.session.save(() => {
            res.redirect("/listings");
        });
    }
})

// Show /users/swaps

// router.get("/swaps", async (req, res, next) => {
//     try {
//         const myListings = await Listing.find({ owner: req.session.user._id });

//         const swapUserIds = myListings.flatMap(l => l.swappedRight);

//         const swappedHomes = await Listing.find({
//             owner: { $in: swapUserIds }
//         }).populate("owner");

//         res.render("users/swaps.ejs", { swappedHomes });
//     } catch (error) {
//         res.redirect("/listings");
//     }
// });



module.exports = router;