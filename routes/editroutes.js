const express     = require("express");
const router  = express.Router();
const passport    = require("passport");
// User model
const User        = require("../models/user");
const ParkSpot = require("../models/parkspot");
const Review = require("../models/spotreview");
const bodyParser   = require('body-parser');
const flash       = require("connect-flash");

const ensureLogin = require("connect-ensure-login");

const uploadCloud = require('../config/cloudinary.js');
const axios = require("axios");

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



router.get('/createspot/:id', ensureAuthenticated, (req, res, next) => {
  // console.log(req.isAuthenticated)
  // console.log(req.params)
  res.render('api/createspot', {id:req.params.id});
});

router.post('/createspot/:id', uploadCloud.single('photo'), (req, res, next) => {
  
  // axios.get(`https://app.ticketmaster.com/discovery/v2/venues/${req.params.id}.json?apikey=Toa0rAG7W0RbHa89xDXyMzcObQHh8kRX`)
  // .then((result)=>{



  // })
  // console.log("before req.params ---->",req.params.id)
  const newParkSpot = new ParkSpot({
    spotUser: req.user._id,
    apiID: req.params.id,
    spotName: req.body.spotName,
    spotLocation: req.body.spotLoc,
    spotPay: req.body.spotPay,
    spotDesc: req.body.spotDesc,
    imgPath: req.file.url,
  })
  newParkSpot.save()
  .then((result) => {
    // console.log("then req.params ---->",req.params.id)
    console.log(result)
    res.redirect(`/locationinfo/${req.params.id}`)
    })
    .catch(err => {console.log(err)})
    
  })
  
  



// spotUser: String,
// apiID: String,
// spotName: {type:String, unique:true, required: true},
// spotLocation: String,
// spotDesc: String,
// spotPay: String,
// imgPath: String,
// googleLoc: {
//   lat: String,
//   long: String,
//            },



module.exports = router;