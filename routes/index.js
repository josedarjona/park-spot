const express     = require("express");
const router  = express.Router();
const passport    = require("passport");
// User model
const User        = require("../models/user");
const ParkSpot = require("../models/parkspot");
const Review = require("../models/spotreview");

const flash       = require("connect-flash");

const ensureLogin = require("connect-ensure-login");

const uploadCloud = require('../config/cloudinary.js');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
