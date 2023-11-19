require("dotenv").config()

const db = require("./db");
const express = require("express");
const path = require("path");
const messageRoutes = require("./routes/messages.js");
const userRoutes = require("./routes/user.js");

const HTTP_PORT = process.env.PORT || 3000;

// express app
const app = express();

// middleware
app.use(express.json());

//aboba

app.use((req, res, next) => {
    console.log(req.method, req.path)
    next()
});

// Loging => dev
app.use(function (req, res, next) {
    let date = new Date();
    let time = date.getDate() + "- " + date.getHours() + ":" + date.getMinutes();
    console.log("-- ", time, " ", req.method, " ", req.originalUrl);
    next();
});

// routes
app.use('/api/messages', messageRoutes)
app.use('/api/user', userRoutes)

// root dir
app.use(express.static(path.join(__dirname, "build")));

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/build/index.html"));
});

// app.on("ready", () => {
//     app.listen(HTTP_PORT, () => {
//         console.log(`Listening on port localhost:${HTTP_PORT}`);
//     });
// });

// connect to db
db.connect(app);

app.listen(HTTP_PORT, () => console.log(`Example app listening on port ${HTTP_PORT}!`));
