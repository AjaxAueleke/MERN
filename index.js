const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const path = require("path");
const { userModel } = require("./model/userSchema");
const { postModel } = require("./model/postSchema");

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.uj1ij.mongodb.net/mernProj?retryWrites=true&w=majority"
  )
  .then((err) => {
    console.log("Connected to database");
  });
app.use(cors());
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
        err.status(500).json({
          error: err,
        });
      }
      if (user == null) {
        res.status(400).json({
          error: "This email is not registered",
        });
      } else {
        if (user.validPassword(req?.body?.password || "")) {
          res.status(200).json({
            message: "Password verified",
            ...user._doc,
          });
        } else {
          res.status(401).json({ error: "Invalid Password" });
        }
      }
    });
  }
});
app.post("/api/v1/signup", (req, res, next) => {
  if (
    !req.body.firstName.trim() ||
    !req.body.lastName.trim() ||
    !req.body.email.trim() ||
    !req.body.password ||
    !req.body.about.trim()
  ) {
    res.status(400).json("Any field is missing");
    return;
  }

  userModel.findOne({ email: req.body.email }, (err, u) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
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
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    } else {
      res.status(403).json("User already exists");
    }
  });
});
app.get("/api/v1/posts/:id", (req, res) => {
  console.log("Hello : ", req.params);

  postModel.find({ userId: req.params.id }, (err, post) => {
    if (err) {
      res.status(500).json({
        message: "Error reading from database",
      });
      return;
    }
    console.log(post);
    res.status(200).json({
      post,
    });
  });
});
app.post("/api/v1/posts", (req, res, next) => {
  console.log(req.body);
  if (!req.body.postDetails || !req.body.userId) {
    res.status(400).json({
      message: "Some vital fields missing",
    });
    return;
  } else {
    const post = new postModel();
    post.postDetail = req.body.postDetails.trim();
    post.userId = req.body.userId;
    post
      .save()
      .then((user) => {
        console.log("Post saved");
        res.status(200).json({
          message: "Post saved",
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Post not saved!",
        });
      });
  }
});
// app.get("/**", (req, res) => res.redirect("/"));
app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
