require("dotenv").config()
const mongoose = require("mongoose");

exports.connect = (app) => {
    const connectWithRetry = () => {
      mongoose.Promise = global.Promise;
      console.log("MongoDB connection with retry");
      mongoose
        .connect(process.env.MONGO_URI) //
        .then(() => {
          console.log("MongoDB is connected");
          app.emit("ready");
        })
        .catch((err) => {
          console.log("MongoDB connection unsuccessful, retry after 2 seconds.", err);
          setTimeout(connectWithRetry, 2000);
        });
    };
    connectWithRetry();
  };