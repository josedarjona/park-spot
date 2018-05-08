const express     = require("express");
const router  = express.Router();
const passport    = require("passport");
// User model
const User        = require("../models/user");



router.get('/testpage', (req, res, next) => {
  res.render('testpage');
});






module.exports = router;