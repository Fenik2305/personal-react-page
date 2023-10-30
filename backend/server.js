require("dotenv").config()

const db = require("./db");
const express = require("express");
const mongoose = require("mongoose");
const messageRoutes = require("./routes/messages.js");

// express app
const app = express();

// connect to db
db.connect(app);

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.path)
    next()
});

// routes
app.use('/api/messages', messageRoutes)



app.on("ready", () => {
    app.listen(process.env.PORT, () => {
        console.log(`Listening on port localhost:${process.env.PORT}`);
    });
});

process.env;