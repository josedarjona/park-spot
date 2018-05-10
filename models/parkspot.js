const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const parkspotSchema = new Schema({
  spotUser: {type: String},
  apiID: String,
  spotName: {type:String, unique:true, required: true},
  spotLocation: String,
  spotDesc: String,
  spotPay: String,
  imgPath: String,
  googleLoc: {
    lat: String,
    long: String,
             },
},
{
  timestamps: true
}
);

const ParkSpot = mongoose.model("ParkSpot", parkspotSchema);

module.exports = ParkSpot;