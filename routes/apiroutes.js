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
const axios = require("axios");

// const venueAPI = url("")

router.get('/locationsearch', (req, res, next) => {
  console.log(req.user);
  res.render('api/locationsearch');
});

router.get('/locationinfo/:id', (req, res, next) => {

  console.log("check this !!!--->", req.params.id)
  const  apiID = req.params.id

  axios.get(`https://app.ticketmaster.com/discovery/v2/venues/${req.params.id}.json?apikey=Toa0rAG7W0RbHa89xDXyMzcObQHh8kRX`)
  .then((result)=>{
    console.log("this is the result!!--->", result.data)
    // const locationImg = "https://media.giphy.com/media/3o7btT1T9qpQZWhNlK/giphy.gif"
    // if(locationImg === undefined){
    //   locationImg = result.data.images[0].url
    // }
    // console.log("this is the img!!--->", locationImg)
    ParkSpot.find({apiID:result.data.id})
    .then((resultFromDB) => {
      // console.log("parking spots ----- ", resultFromDB);
      // console.log("location info ---- ", result.data)
      // console.log("blah-------->",resultFromDB[0].createdAt.toDateString())
      // const dateSpot = resultFromDB[0].createdAt.toDateString();
      // ParkSpot.update({}, {$set: {createdAt: dateSpot}})
      // .then(spots => {
      //   console.log("heyyy : ", spots)
      // })
      res.render('api/showlocation', { locationInfo : result.data, parkingSpots: resultFromDB})
    })
    .catch((err) => {
      next(err);
    });
    // console.log(result.data)
  })

  // res.render('api/showlocation')

});





module.exports = router;