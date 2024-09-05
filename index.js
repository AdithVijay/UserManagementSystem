const nocache = require("nocache");
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");
    next();
  });
  
mongoose.connect("mongodb://127.0.0.1:27017/user_management_system");

app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(expressLayout);

app.set("layout", "layouts/layout");

//for user
const userRoute = require("./routes/userRoute");

app.use("/", userRoute);

//for Admin
const adminRoute = require("./routes/adminRoute");

app.use("/admin", adminRoute);

app.listen(3000, () => {
    console.log("server is running in port 3000");
});