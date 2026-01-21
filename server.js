
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const morgan = require("morgan")
const methodOverride = require("method-override")
const authRoutes = require("./controllers/auth")
const homeController = require("./controllers/home")
const userController = require("./controllers/user")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const passDataToView = require('./middleware/pass-data-to-view')

// Middleware

require("./db/connection")
app.use(morgan("tiny"))
app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    })
})
);
app.use(passDataToView)


// Routes

// Home

app.get("/", (req, res) => {
    res.render("index.ejs")
})


app.use("/auth", authRoutes)


// Routes below require sign-in

app.use((req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.redirect("/")
    }
})

app.use("/homes", homeController)
app.use('/users', userController)


app.listen(PORT, () => {
    console.log("Running on", PORT)
})


