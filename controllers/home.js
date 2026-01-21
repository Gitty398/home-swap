const express = require("express");
const router = express.Router({ mergeParams: true });
const Home = require("../models/home");

// INDUCES

// Index
router.get("/", async (req, res) => {
    const homes = await Home.find({});
    res.render("homes/index.ejs", { homes });
});

// New
router.get("/new", async (req, res) => {
    res.render("homes/new.ejs")
})

// Delete
// Update

// Create
router.post("/", async (req, res) => {
    try {
        req.body.owner = req.session.user._id
        await Home.create(req.body);
        res.redirect("/users/myprofile")
    } catch (error) {
        console.log(error)
        res.redirect("homes/new")
    }
})


// Edit
router.get("/:homeId/edit", async (req, res) => {
    try {
        const foundHome = await Home.findById(req.params.homeId)
        if (!foundHome)
            throw new Error(`There is no property with an ID of ${req.params.homeId}`)
        res.render("homes/edit.ejs", { home: foundHome })
    } catch (error) {
        console.log(error)
        res.redirect("/")
    }
})


// Show
router.get("/:homeId", async (req, res) => {
    try {
        const foundHome = await Home.findById(req.params.homeId).populate("owner")
        if (!foundHome)
            throw new Error(`There is no property with an ID of ${req.params.homeId}`)
        res.render("homes/show.ejs", { home: foundHome })
    } catch (error) {
        console.log(error)
        res.redirect("/homes")
    }
})


// Seed
// router.get("/seed", async (req, res) => {
//     const homes = [
//         {
//             streetAddress: "123 Ocean View Dr",
//             city: "Miami",
//             numBedrooms: 3,
//             numBathrooms: 2,
//             class: "Single-Family Home",
//             owner: "696fa8c2a64a99c3197c9a78",
//             swappedRight: [],
//             beachAccess: true,
//             poolAvailable: true,
//             petsAllowed: true,
//             image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
//         },
//         {
//             streetAddress: "45 Sunset Blvd Apt 12B",
//             city: "Los Angeles",
//             numBedrooms: 2,
//             numBathrooms: 2,
//             class: "Apartment/ Condo",
//             owner: "696fa8c2a64a99c3197c9a78",
//             swappedRight: [],
//             beachAccess: false,
//             poolAvailable: true,
//             petsAllowed: false,
//             image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
//         },
//         {
//             streetAddress: "777 Maple Ridge Rd",
//             city: "Portland",
//             numBedrooms: 4,
//             numBathrooms: 3,
//             class: "Single-Family Home",
//             owner: "696fa8c2a64a99c3197c9a78",
//             swappedRight: [],
//             beachAccess: false,
//             poolAvailable: false,
//             petsAllowed: true,
//             image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
//         },
//         {
//             streetAddress: "1600 Lake Shore Dr",
//             city: "Chicago",
//             numBedrooms: 2,
//             numBathrooms: 1,
//             class: "Apartment/ Condo",
//             owner: "696fa8c2a64a99c3197c9a78",
//             swappedRight: [],
//             beachAccess: false,
//             poolAvailable: false,
//             petsAllowed: false,
//             image: "https://images.unsplash.com/photo-1554995207-c18c203602cb"
//         },
//         {
//             streetAddress: "300 Mountain Peak Rd",
//             city: "Jackson Hole",
//             numBedrooms: 5,
//             numBathrooms: 4,
//             class: "Single-Family Home",
//             owner: "696fdbf7c8f6ee0dacf8f791",
//             swappedRight: [],
//             beachAccess: false,
//             poolAvailable: true,
//             petsAllowed: true,
//             image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde"
//         }
//     ];

//     await Home.create(homes);
//     res.redirect("/homes")
// })

module.exports = router;