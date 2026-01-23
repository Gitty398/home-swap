const express = require("express");
const router = express.Router({ mergeParams: true });
const Home = require("../models/home");

// INDUCES

// Index
router.get("/", (req, res) => {
    res.render("/")
});

// Show /users/myprofile

router.get("/myprofile", async (req, res) => {
    try {
        const myHomes = await Home.find({ owner: req.session.user._id, }).populate("owner");

        const swappedRightHomes = await Home.find({ swappedRight: req.session.user._id, }).populate("owner")

        res.render("users/show.ejs", { myHomes, swappedRightHomes})

    } catch (error) {
        req.session.message = error.message;
        req.session.save(() => {
            res.redirect("/homes");
        });
    }
})

// Show /users/swaps

// router.get("/swaps", async (req, res, next) => {
//     try {
//         const myhomes = await Home.find({ owner: req.session.user._id });

//         const swapUserIds = myhomes.flatMap(l => l.swappedRight);

//         const swappedHomes = await home.find({
//             owner: { $in: swapUserIds }
//         }).populate("owner");

//         res.render("users/swaps.ejs", { swappedHomes });
//     } catch (error) {
//         res.redirect("/homes");
//     }
// });



module.exports = router;