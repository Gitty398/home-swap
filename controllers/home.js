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
    } catch (error) {

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
//             owner: "000000000000000000000001",
//             swappedRight: [],
//             beachAccess: true,
//             poolAvailable: true,
//             petsAllowed: true,
//             image: "https://commons.wikimedia.org/wiki/Special:FilePath/House%20exterior%20view.JPG?width=1200"
//         },
//         {
//             streetAddress: "45 Sunset Blvd Apt 12B",
//             city: "Los Angeles",
//             numBedrooms: 2,
//             numBathrooms: 2,
//             class: "Apartment/ Condo",
//             owner: "000000000000000000000002",
//             swappedRight: [],
//             beachAccess: false,
//             poolAvailable: true,
//             petsAllowed: false,
//             image: "https://commons.wikimedia.org/wiki/Special:FilePath/Apartment%20Building%20099.jpg?width=1200"
//         },
//         {
//             streetAddress: "789 Pine St",
//             city: "Denver",
//             numBedrooms: 4,
//             numBathrooms: 3,
//             class: "Single-Family Home",
//             owner: "000000000000000000000003",
//             swappedRight: [],
//             beachAccess: false,
//             poolAvailable: false,
//             petsAllowed: true,
//             image: "https://commons.wikimedia.org/wiki/Special:FilePath/Suburban%20tract%20house.JPG?width=1200"
//         },
//         {
//             streetAddress: "1600 Lake Shore Dr",
//             city: "Chicago",
//             numBedrooms: 2,
//             numBathrooms: 1,
//             class: "Apartment/ Condo",
//             owner: "000000000000000000000004",
//             swappedRight: [],
//             beachAccess: false,
//             poolAvailable: false,
//             petsAllowed: false,
//             image: "https://commons.wikimedia.org/wiki/Special:FilePath/Apartment%20building-%20modern%20tower.jpg?width=1200"
//         },
//         {
//             streetAddress: "555 Palm Way",
//             city: "Honolulu",
//             numBedrooms: 3,
//             numBathrooms: 2,
//             class: "Single-Family Home",
//             owner: "000000000000000000000005",
//             swappedRight: [],
//             beachAccess: true,
//             poolAvailable: false,
//             petsAllowed: true,
//             image: "https://commons.wikimedia.org/wiki/Special:FilePath/Gold%20Coast%20suburban%20home.jpg?width=1200"
//         },
//         {
//             streetAddress: "92 Broadway",
//             city: "New York",
//             numBedrooms: 1,
//             numBathrooms: 1,
//             class: "Apartment/ Condo",
//             owner: "000000000000000000000006",
//             swappedRight: [],
//             beachAccess: false,
//             poolAvailable: false,
//             petsAllowed: false,
//             image: "https://commons.wikimedia.org/wiki/Special:FilePath/Apartment%20building%20facing%20the%20Eiffel%20Tower%202.jpg?width=1200"
//         },
//         {
//             streetAddress: "777 Maple Rd",
//             city: "Portland",
//             numBedrooms: 3,
//             numBathrooms: 2,
//             class: "Single-Family Home",
//             owner: "000000000000000000000007",
//             swappedRight: [],
//             beachAccess: false,
//             poolAvailable: true,
//             petsAllowed: true,
//             image: "https://commons.wikimedia.org/wiki/Special:FilePath/Old%20Stone%20House%20Exterior.jpg?width=1200"
//         },
//         {
//             streetAddress: "321 Desert Bloom Ln",
//             city: "Phoenix",
//             numBedrooms: 4,
//             numBathrooms: 3,
//             class: "Single-Family Home",
//             owner: "000000000000000000000008",
//             swappedRight: [],
//             beachAccess: false,
//             poolAvailable: true,
//             petsAllowed: false,
//             image: "https://commons.wikimedia.org/wiki/Special:FilePath/Suburban%20houses%20near%20a%20forest%20%28Unsplash%29.jpg?width=1200"
//         },
//         {
//             streetAddress: "888 Riverfront Dr",
//             city: "Austin",
//             numBedrooms: 2,
//             numBathrooms: 2,
//             class: "Apartment/ Condo",
//             owner: "000000000000000000000009",
//             swappedRight: [],
//             beachAccess: false,
//             poolAvailable: true,
//             petsAllowed: true,
//             image: "https://commons.wikimedia.org/wiki/Special:FilePath/Condo%20building%20in%20downtown%20Falls%20Church.jpg?width=1200"
//         },
//         {
//             streetAddress: "456 Country Rd",
//             city: "Nashville",
//             numBedrooms: 3,
//             numBathrooms: 2,
//             class: "Single-Family Home",
//             owner: "000000000000000000000010",
//             swappedRight: [],
//             beachAccess: false,
//             poolAvailable: false,
//             petsAllowed: true,
//             image: "https://commons.wikimedia.org/wiki/Special:FilePath/Thames%20house%20exterior.jpg?width=1200"
//         },

//         {
//             streetAddress: "12 Bay Harbor Ct",
//             city: "San Diego",
//             numBedrooms: 2,
//             numBathrooms: 2,
//             class: "Apartment/ Condo",
//             owner: "000000000000000000000011",
//             swappedRight: [],
//             beachAccess: true,
//             poolAvailable: true,
//             petsAllowed: false,
//             image: "https://commons.wikimedia.org/wiki/Special:FilePath/AIMCO%20apartment%20exterior.jpg?width=1200"
//         },
//         {
//             streetAddress: "98 Forest Path",
//             city: "Asheville",
//             numBedrooms: 3,
//             numBathrooms: 2,
//             class: "Single-Family Home",
//             owner: "000000000000000000000012",
//             swappedRight: [],
//             beachAccess: false,
//             poolAvailable: false,
//             petsAllowed: true,
//             image: "https://commons.wikimedia.org/wiki/Special:FilePath/Houses%20in%20the%20Suburbs%20-%20Maple%20Grove%2C%20Minnesota%20%2839756741524%29.jpg?width=1200"
//         },
//         {
//             streetAddress: "101 Snowy Ridge Rd",
//             city: "Salt Lake City",
//             numBedrooms: 4,
//             numBathrooms: 3,
//             class: "Single-Family Home",
//             owner: "000000000000000000000013",
//             swappedRight: [],
//             beachAccess: false,
//             poolAvailable: false,
//             petsAllowed: true,
//             image: "https://commons.wikimedia.org/wiki/Special:FilePath/Suburban%20neighborhood%20%28Unsplash%29.jpg?width=1200"
//         },
//         {
//             streetAddress: "55 Harbor Point",
//             city: "Seattle",
//             numBedrooms: 2,
//             numBathrooms: 1,
//             class: "Apartment/ Condo",
//             owner: "000000000000000000000014",
//             swappedRight: [],
//             beachAccess: false,
//             poolAvailable: false,
//             petsAllowed: false,
//             image: "https://commons.wikimedia.org/wiki/Special:FilePath/Apartment%20buildings%20-%20modern%20and%20heritage.jpg?width=1200"
//         },
//         {
//             streetAddress: "17 Bourbon St",
//             city: "New Orleans",
//             numBedrooms: 1,
//             numBathrooms: 1,
//             class: "Apartment/ Condo",
//             owner: "000000000000000000000015",
//             swappedRight: [],
//             beachAccess: false,
//             poolAvailable: false,
//             petsAllowed: false,
//             image: "https://commons.wikimedia.org/wiki/Special:FilePath/Brown%20Apartment%20Building%20%28Unsplash%29.jpg?width=1200"
//         },
//         {
//             streetAddress: "650 Prairie Ln",
//             city: "Dallas",
//             numBedrooms: 3,
//             numBathrooms: 2,
//             class: "Single-Family Home",
//             owner: "000000000000000000000016",
//             swappedRight: [],
//             beachAccess: false,
//             poolAvailable: true,
//             petsAllowed: true,
//             image: "https://commons.wikimedia.org/wiki/Special:FilePath/Suburban%20tract%20house.JPG?width=1200"
//         },
//         {
//             streetAddress: "909 Silicon Ave",
//             city: "San Jose",
//             numBedrooms: 2,
//             numBathrooms: 2,
//             class: "Apartment/ Condo",
//             owner: "000000000000000000000017",
//             swappedRight: [],
//             beachAccess: false,
//             poolAvailable: true,
//             petsAllowed: false,
//             image: "https://commons.wikimedia.org/wiki/Special:FilePath/Apartment%20High%20Rise%20Building%20%28Unsplash%29.jpg?width=1200"
//         },
//         {
//             streetAddress: "234 Capital Hill",
//             city: "Washington",
//             numBedrooms: 3,
//             numBathrooms: 2,
//             class: "Multi-Family",
//             owner: "000000000000000000000018",
//             swappedRight: [],
//             beachAccess: false,
//             poolAvailable: false,
//             petsAllowed: true,
//             image: "https://commons.wikimedia.org/wiki/Special:FilePath/APARTMENT%20COMPLEX%20%286819831308%29.jpg?width=1200"
//         },
//         {
//             streetAddress: "76 Liberty Ln",
//             city: "Boston",
//             numBedrooms: 2,
//             numBathrooms: 1,
//             class: "Apartment/ Condo",
//             owner: "000000000000000000000019",
//             swappedRight: [],
//             beachAccess: false,
//             poolAvailable: false,
//             petsAllowed: false,
//             image: "https://commons.wikimedia.org/wiki/Special:FilePath/Fort%20Howe%20Apartments.jpg?width=1200"
//         },
//         {
//             streetAddress: "18 Peachtree St",
//             city: "Atlanta",
//             numBedrooms: 3,
//             numBathrooms: 2,
//             class: "Single-Family Home",
//             owner: "000000000000000000000020",
//             swappedRight: [],
//             beachAccess: false,
//             poolAvailable: true,
//             petsAllowed: true,
//             image: "https://commons.wikimedia.org/wiki/Special:FilePath/House%20exterior%20view.JPG?width=1200"
//         },
//         {
//             streetAddress: "7 Canyon Vista",
//             city: "Las Vegas",
//             numBedrooms: 4,
//             numBathrooms: 3,
//             class: "Single-Family Home",
//             owner: "000000000000000000000021",
//             swappedRight: [],
//             beachAccess: false,
//             poolAvailable: true,
//             petsAllowed: false,
//             image: "https://commons.wikimedia.org/wiki/Special:FilePath/Gold%20Coast%20suburban%20home.jpg?width=1200"
//         },
//         {
//             streetAddress: "222 Ocean Breeze",
//             city: "Santa Monica",
//             numBedrooms: 2,
//             numBathrooms: 2,
//             class: "Apartment/ Condo",
//             owner: "000000000000000000000022",
//             swappedRight: [],
//             beachAccess: true,
//             poolAvailable: false,
//             petsAllowed: false,
//             image: "https://commons.wikimedia.org/wiki/Special:FilePath/Condominium%20kuala%20lumpur.jpg?width=1200"
//         },
//         {
//             streetAddress: "14 Rocky Rd",
//             city: "Boise",
//             numBedrooms: 3,
//             numBathrooms: 2,
//             class: "Single-Family Home",
//             owner: "000000000000000000000023",
//             swappedRight: [],
//             beachAccess: false,
//             poolAvailable: false,
//             petsAllowed: true,
//             image: "https://commons.wikimedia.org/wiki/Special:FilePath/Old%20Stone%20House%20Exterior.jpg?width=1200"
//         },
//         {
//             streetAddress: "89 Vine St",
//             city: "San Francisco",
//             numBedrooms: 1,
//             numBathrooms: 1,
//             class: "Apartment/ Condo",
//             owner: "000000000000000000000024",
//             swappedRight: [],
//             beachAccess: false,
//             poolAvailable: false,
//             petsAllowed: false,
//             image: "https://commons.wikimedia.org/wiki/Special:FilePath/AIMCO%20apartment%20exterior%202.jpg?width=1200"
//         },
//         {
//             streetAddress: "300 Mountain Peak Rd",
//             city: "Jackson Hole",
//             numBedrooms: 5,
//             numBathrooms: 4,
//             class: "Single-Family Home",
//             owner: "000000000000000000000025",
//             swappedRight: [],
//             beachAccess: false,
//             poolAvailable: false,
//             petsAllowed: true,
//             image: "https://commons.wikimedia.org/wiki/Special:FilePath/Suburban%20houses%20near%20a%20forest%20%28Unsplash%29.jpg?width=1200"
//         }
//     ];

//     await Home.create(homes);
//     res.redirect("/homes")
// })

module.exports = router;