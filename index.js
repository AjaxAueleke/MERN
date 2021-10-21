const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");

const mongoose = require("mongoose");

app.use(express.json());
app.use("/", express.static(path.join(__dirname, "web/build")))

app.post("/api/v1/signup", (req, res, next) => {
    console.log(req.body)
});

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
})