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
router.delete("/:homeId", async (req, res) => {
    try {
        const foundHome = await Home.findById(req.params.homeId)
        if (!foundHome.owner._id.equals(req.session.user._id)) {
            throw new Error("You cannot delete a Home if you do not own it!");
        }
        await foundHome.deleteOne()

        res.redirect("/homes")

    } catch (error) {
        console.log(error);
        res.redirect(`/homes/${req.params.homeId}`);
    }
});



// Update
router.put("/:homeId", async (req, res) => {
    try {
        const foundHome = await Home.findById(req.params.homeId)
        if (!foundHome.owner._id.equals(req.session.user._id)) {
            throw new Error("You cannot delete a Home if you do not own it!");
        }
        await foundHome.updateOne(req.body);

        res.redirect("/homes")

    } catch (error) {
        console.log(error);
        res.redirect(`/homes/${req.params.homeId}`);
    }
});


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

// Seed
router.get("/seed", async (req, res) => {
    const homes = [

        // --- Batch 1 ---
        {
            streetAddress: "123 Ocean View Dr",
            city: "Miami",
            numBedrooms: 3,
            numBathrooms: 2,
            class: "Single-Family Home",
            owner: "69750f21b6b6dcf503f40e3f",
            beachAccess: true,
            poolAvailable: true,
            petsAllowed: true,
            image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae"
        },
        {
            streetAddress: "45 Sunset Blvd Apt 12B",
            city: "Los Angeles",
            numBedrooms: 2,
            numBathrooms: 2,
            class: "Apartment/ Condo",
            owner: "69750f32b6b6dcf503f40e44",
            poolAvailable: true,
            image: "https://images.unsplash.com/photo-1494526585095-c41746248156"
        },
        {
            streetAddress: "789 Pine St",
            city: "Denver",
            numBedrooms: 4,
            numBathrooms: 3,
            class: "Single-Family Home",
            owner: "69750f40b6b6dcf503f40e49",
            petsAllowed: true,
            image: "https://images.unsplash.com/photo-1572120360610-d971b9b78825"
        },
        {
            streetAddress: "1600 Lake Shore Dr",
            city: "Chicago",
            numBedrooms: 2,
            numBathrooms: 1,
            class: "Apartment/ Condo",
            owner: "69750f4db6b6dcf503f40e4e",
            image: "https://images.unsplash.com/photo-1484154218962-a197022b5858"
        },
        {
            streetAddress: "555 Palm Way",
            city: "Honolulu",
            numBedrooms: 3,
            numBathrooms: 2,
            class: "Single-Family Home",
            owner: "69750f60b6b6dcf503f40e53",
            beachAccess: true,
            petsAllowed: true,
            image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511"
        },

        // --- Batch 2 ---
        {
            streetAddress: "777 Maple Rd",
            city: "Portland",
            numBedrooms: 3,
            numBathrooms: 2,
            class: "Single-Family Home",
            owner: "69750f21b6b6dcf503f40e3f",
            poolAvailable: true,
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
        },
        {
            streetAddress: "321 Desert Bloom Ln",
            city: "Phoenix",
            numBedrooms: 4,
            numBathrooms: 3,
            class: "Single-Family Home",
            owner: "69750f32b6b6dcf503f40e44",
            poolAvailable: true,
            image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6"
        },
        {
            streetAddress: "888 Riverfront Dr",
            city: "Austin",
            numBedrooms: 2,
            numBathrooms: 2,
            class: "Apartment/ Condo",
            owner: "69750f40b6b6dcf503f40e49",
            poolAvailable: true,
            image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
        },
        {
            streetAddress: "92 Broadway",
            city: "New York",
            numBedrooms: 1,
            numBathrooms: 1,
            class: "Apartment/ Condo",
            owner: "69750f4db6b6dcf503f40e4e",
            image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
        },
        {
            streetAddress: "456 Country Rd",
            city: "Nashville",
            numBedrooms: 3,
            numBathrooms: 2,
            class: "Single-Family Home",
            owner: "69750f60b6b6dcf503f40e53",
            petsAllowed: true,
            image: "https://images.unsplash.com/photo-1599423300746-b62533397364"
        },

        // --- Batch 3 ---
        {
            streetAddress: "12 Bay Harbor Ct",
            city: "San Diego",
            numBedrooms: 2,
            numBathrooms: 2,
            class: "Apartment/ Condo",
            owner: "69750f21b6b6dcf503f40e3f",
            beachAccess: true,
            poolAvailable: true,
            image: "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1"
        },
        {
            streetAddress: "101 Snowy Ridge Rd",
            city: "Salt Lake City",
            numBedrooms: 4,
            numBathrooms: 3,
            class: "Single-Family Home",
            owner: "69750f32b6b6dcf503f40e44",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
        },
        {
            streetAddress: "76 Liberty Ln",
            city: "Boston",
            numBedrooms: 2,
            numBathrooms: 1,
            class: "Apartment/ Condo",
            owner: "69750f40b6b6dcf503f40e49",
            image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6"
        },
        {
            streetAddress: "18 Peachtree St",
            city: "Atlanta",
            numBedrooms: 3,
            numBathrooms: 2,
            class: "Single-Family Home",
            owner: "69750f4db6b6dcf503f40e4e",
            poolAvailable: true,
            image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994"
        },
        {
            streetAddress: "300 Mountain Peak Rd",
            city: "Jackson Hole",
            numBedrooms: 5,
            numBathrooms: 4,
            class: "Single-Family Home",
            owner: "69750f60b6b6dcf503f40e53",
            image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd"
        },

        // --- Batch 4 ---
        {
            streetAddress: "54 Cedar Ct",
            city: "Seattle",
            numBedrooms: 3,
            numBathrooms: 2,
            class: "Single-Family Home",
            owner: "69750f21b6b6dcf503f40e3f",
            image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde"
        },
        {
            streetAddress: "99 Highrise Ave Apt 21",
            city: "San Francisco",
            numBedrooms: 1,
            numBathrooms: 1,
            class: "Apartment/ Condo",
            owner: "69750f32b6b6dcf503f40e44",
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00"
        },
        {
            streetAddress: "812 Aspen Way",
            city: "Boulder",
            numBedrooms: 4,
            numBathrooms: 3,
            class: "Single-Family Home",
            owner: "69750f40b6b6dcf503f40e49",
            image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf"
        },
        {
            streetAddress: "22 Magnolia Ln",
            city: "Savannah",
            numBedrooms: 3,
            numBathrooms: 2,
            class: "Single-Family Home",
            owner: "69750f4db6b6dcf503f40e4e",
            image: "https://images.unsplash.com/photo-1592595896616-c37162298647"
        },
        {
            streetAddress: "410 Desert Star Rd",
            city: "Tucson",
            numBedrooms: 3,
            numBathrooms: 2,
            class: "Single-Family Home",
            owner: "69750f60b6b6dcf503f40e53",
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
        },

        // --- Batch 5 ---
        {
            streetAddress: "16 River Walk Apt 3C",
            city: "San Antonio",
            numBedrooms: 2,
            numBathrooms: 2,
            class: "Apartment/ Condo",
            owner: "69750f21b6b6dcf503f40e3f",
            image: "https://images.unsplash.com/photo-1501183638710-841dd1904471"
        },
        {
            streetAddress: "78 Coral Reef Dr",
            city: "Key West",
            numBedrooms: 3,
            numBathrooms: 2,
            class: "Single-Family Home",
            owner: "69750f32b6b6dcf503f40e44",
            beachAccess: true,
            image: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353"
        },
        {
            streetAddress: "900 Park Ave",
            city: "New York",
            numBedrooms: 2,
            numBathrooms: 2,
            class: "Apartment/ Condo",
            owner: "69750f40b6b6dcf503f40e49",
            image: "https://images.unsplash.com/photo-1515263487990-61b07816b324"
        },
        {
            streetAddress: "47 Orchard Rd",
            city: "Madison",
            numBedrooms: 3,
            numBathrooms: 2,
            class: "Single-Family Home",
            owner: "69750f4db6b6dcf503f40e4e",
            image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00"
        },
        {
            streetAddress: "66 Lakeshore Dr",
            city: "Minneapolis",
            numBedrooms: 4,
            numBathrooms: 3,
            class: "Single-Family Home",
            owner: "69750f60b6b6dcf503f40e53",
            image: "https://images.unsplash.com/photo-1576941089067-2de3c901e126"
        }
    ];

    await Home.create(homes);
    res.redirect("/homes");
});


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

        const userHasSwappedRight = foundHome.swappedRight.some(user => {
            return user.equals(req.session.user._id)
        })

        const theySwappedRightOnMe = Boolean(await Home.exists({
            owner: req.session.user._id,
            swappedRight: foundHome.owner._id
        })
        );

        res.render("homes/show.ejs", { home: foundHome, userHasSwappedRight, theySwappedRightOnMe })
    } catch (error) {
        console.log(error)
        res.redirect("/homes")
    }
})


// POST swapped-right-by
router.post("/:homeId/swapped-right-by/:userId", async (req, res) => {
    try {
        await Home.findByIdAndUpdate(req.params.homeId, {
            $addToSet: { swappedRight: req.params.userId }
        });
        res.redirect(`/homes/${req.params.homeId}`);

    } catch (error) {
        console.log(error)
        res.redirect("/homes");
    }
});

// DELETE swapped-right-by
router.delete("/:homeId/swapped-right-by/:userId", async (req, res) => {
    try {
        await Home.findByIdAndUpdate(req.params.homeId, {
            $pull: { swappedRight: req.params.userId }
        })

        res.redirect(`/homes/${req.params.homeId}`)

    } catch (error) {
        console.log(error);
        res.redirect("/homes");
    }
});

module.exports = router;