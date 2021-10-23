const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const path = require("path");
const { userModel } = require("./model/mongoose");
const bcryptjs = require("bcryptjs");

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.uj1ij.mongodb.net/mernProj?retryWrites=true&w=majority"
  )
  .then((err) => {
    console.log("Connected to database");
  });


app.use(cors);
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "web/build")));
app.post("/api/v1/login", (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      error: "Fields missing",
    });
    return;
  } else {
    userModel.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            err.status(500).send({
                error : err
            })
        }
      if (user == null) {
        res.status(400).send({
          error: "This email is not registered",
        });
      } else {
        console.log(user);
        if (user.validPassword(req?.body?.password || "")) {
          res.status(200).send({
            message: "Password verified",
            ...user._doc,
          });
        } else {
          res.status(401).send({ error: "Invalid Password" });
        }
      }
    });
  }
});
app.post("/api/v1/signup", (req, res, next) => {
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password ||
    !req.body.about
  ) {
    res.status(400).send("Any field is missing");
    return;
  }

  userModel.findOne({ email: req.body.email }, (err, u) => {
    if (err) {
        res.status(500).send({
            error : err
        })
        return;
    }
    if (u == null) {
      const user = new userModel();
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.email = req.body.email;
      user.savePass(req.body.password);
      user.about = req.body.about;
      user
        .save()
        .then((user) => res.status(200).send("User created successfully"))
        .catch(err => {
            console.log(err);
            res.status(500).send({
                error : err
            });
        })
    } else {
      res.status(403).send("User already exists");
    }
  });
});
app.get("/**", (req, res) => res.redirect("/"));
app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
