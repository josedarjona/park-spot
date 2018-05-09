const express     = require("express");
const router  = express.Router();
const passport    = require("passport");
// User model
const User        = require("../models/user");
const axios = require("axios")

// const venueAPI = url("")

router.get('/locationsearch', (req, res, next) => {
  res.render('api/locationsearch');
});

router.get('/locationinfo/:id', (req, res, next) => {

  console.log(req.params.id)

  axios.get(`https://app.ticketmaster.com/discovery/v2/venues/${req.params.id}.json?apikey=Toa0rAG7W0RbHa89xDXyMzcObQHh8kRX`)
  .then((result)=>{
    console.log(result.data)
    res.render('api/showlocation', { locationInfo : result.data})
  })







  // res.render('api/showlocation')

});





module.exports = router;