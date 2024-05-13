const express = require("express");
const morgan = require("morgan");

const PORT = 5000;
const app = express();


//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"))

// Database Configuration
const { connect_database } = require("./db/connect_db");
connect_database();

// Authentication Middleware
const verifyToken = require("./middleware/auth");

// Route imports
const authRoutes = require("./routes/auth");
const membersRoutes = require("./routes/members");
const packagesRoutes = require("./routes/packages");
const subscriptionsRoutes = require("./routes/subscriptions");

//base route
app.get("/", (req, res) => {
    res.send({ message: "Server is running!!" }).status(200)
});

app.use("/auth", authRoutes);
app.use("/members", verifyToken, membersRoutes);
app.use("/packages", verifyToken, packagesRoutes);
app.use("/subscriptions", verifyToken, subscriptionsRoutes);


app.listen(PORT, () => {
    console.log(`The server is running on: http://localhost:${PORT}`)
})