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
    if (req.isAuthenticated() && req.user._id === role) {
      return next();
    } else {
      res.redirect('/')
    }
  }
}



router.get('/createspot/:id', ensureAuthenticated, (req, res, next) => {
  // console.log(req.isAuthenticated)
  // console.log(req.params)
  console.log(req.user)
  res.render('api/createspot', {id:req.params.id});
});

router.post('/createspot/:id', ensureAuthenticated, uploadCloud.single('photo'), (req, res, next) => {
  
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


  
  router.get('/parkspot/:id', ensureAuthenticated, (req, res, next) => {
  
    ParkSpot.findById(req.params.id)
    .then((result) => {
      // console.log("parking spots ----- ", resultFromDB);
      // console.log("location info ---- ", result.data)
      res.render('api/parkspot', {parkingSpots: result})
    })
    .catch((err) => {
      next(err);
    });



    // res.render('api/parkspot', {id:req.params.id});
  });

  router.get('/parkspot/edit/:id', ensureAuthenticated, (req, res, next) => {
  
    ParkSpot.findById(req.params.id)
    .then((result) => {
      // console.log("parking spots ----- ", resultFromDB);
      // console.log("location info ---- ", result.data)
      res.render('api/editparkspot', {parkingSpots: result})
    })
    .catch((err) => {
      next(err);
    });



    // res.render('api/parkspot', {id:req.params.id});
  });


  
router.post('/parkspot/edit/:id', ensureAuthenticated, uploadCloud.single('photo'), (req, res, next) => {
  // console.log("req user check ---- >",req.user)
  // console.log("req file url ---->", req.file.url)
  // if r
  ParkSpot.findById(req.params.id)
    .then((spotResult) => {
      console.log("spotResult =-=-=->", spotResult)
      spotResult.spotUser = req.user._id;
      spotResult.spotName = req.body.spotName;
      spotResult.spotLocation = req.body.spotLoc;
      spotResult.spotPay = req.body.spotPay;
      spotResult.spotDesc = req.body.spotDesc;
      spotResult.imgPath = spotResult.imgPath;

      if (req.file != null) {
        spotResult.imgPath = req.file.url;
      }
      else {
        spotResult.imgPath = spotResult.imgPath;
        
      }
      spotResult.save()
      .then((result) => {
        res.redirect(`/parkspot/${req.params.id}`)
      })
      .catch((err) => {
          console.log("1st catch error",err)
          res.redirect(`/parkspot/edit/${req.params.id}`)
        })

    })
    .catch((err) => {
      console.log("2nd catch error",err)
      res.redirect(`/parkspot/edit/${req.params.id}`)
    })
}) 
  //   {
  //   spotUser: req.user._id,
  //   spotName: req.body.spotName,
  //   spotLocation: req.body.spotLoc,
  //   spotPay: req.body.spotPay,
  //   spotDesc: req.body.spotDesc,
  //   imgPath: req.file.url,
    
  //  })
  //   .then((result) => {
  //     console.log("then req.params ---->",req.params)
  //     console.log("result log------>",result)
  //     res.redirect(`/parkspot/${req.params.id}`)
  //     })
      // .catch(err => {console.log(err)
      //   res.redirect(`/parkspot/edit/${req.params.id}`)
      // })
   
    // })


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

router.get('/dashboard', ensureAuthenticated, (req, res, next) => {
  // console.log(req.isAuthenticated)
  // console.log(req.params)
  // console.log("dashboard--->", req.user)
  // res.render('api/dashboard', {user: req.user});
  ParkSpot.find({spotUser: req.user._id})
    .then((resultFromDB) => {
      // console.log("parking spots ----- ", resultFromDB);
      // console.log("location info ---- ", result.data)
      res.render('api/dashboard', { user:req.user, parkingSpots: resultFromDB})
    })
    .catch((err) => {
      next(err);
    });




});

module.exports = router;