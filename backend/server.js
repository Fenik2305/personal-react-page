require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");
const messageRoutes = require("./routes/messages.js");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.path)
    next()
});

// routes
app.use('/api/messages', messageRoutes)


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log(`Connected to DB.`);
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log(`Listening on port localhost:${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

process.env;