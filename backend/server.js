require("dotenv").config()

const db = require("./db");
const express = require("express");
const messageRoutes = require("./routes/messages.js");
const userRoutes = require("./routes/user.js");

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
app.use('/api/user', userRoutes)

app.on("ready", () => {
    app.listen(process.env.PORT, () => {
        console.log(`Listening on port localhost:${process.env.PORT}`);
    });
});

process.env;