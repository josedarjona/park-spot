const express     = require("express");
const router  = express.Router();
const passport    = require("passport");
// User model
const User        = require("../models/user");
const ParkSpot = require("../models/parkspot");
const Review = require("../models/spotreview");

const flash       = require("connect-flash");

const ensureLogin = require("connect-ensure-login");
const axios = require("axios");
const uploadCloud = require('../config/cloudinary.js');
// BCrypt to encrypt passwords
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {

    res.redirect('/login')
  }
}

function checkRoles(role) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect('/')
    }
  }
}



/* GET home page */
// Bcrypt to encrypt passwords

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  if (username === "" || password === "" || email === "") {
    res.render("auth/signup", { message: "Please indicate username, password and email" });
    return;
  }

  
  User.findOne({ username:username}, "username",  (err, user) => {
    console.log(user);
    console.log(User.email);
    if (user !== null) {
      res.render("auth/signup", { message: "Sorry, that username already exists" });
      // console.log(` if 🚨🚨🚨🚨🚨 user: ${username}  -email: ${email}` )
      return;
    }

    User.findOne({ email:email}, "email",  (err, user) => {
      if (user !== null) {
        res.render("auth/signup", { message: "Sorry, that email already exists" });
        // console.log(` if 🚨🚨🚨🚨🚨 user: ${username}  -email: ${email}` )
        return;
      }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username:username,
      password: hashPass,
      email: email,
    });

    newUser.save((err) => {
      if (err) {
        console.log(err)
        res.render("auth/signup", { message: "Something went wrong" });
      } else {
        res.redirect("/");
      }
    });
  });
});
});



router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local",
{
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}
));

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});




module.exports = router;