<<<<<<< HEAD
var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;
 
var LoyaltyTransactionSchema = new Schema({

  loyaltyScheme: {type : Schema.ObjectId, ref: 'LoyaltyScheme'},
  loyaltyStatement: {type : Schema.ObjectId, ref: 'LoyaltyStatement'},
  loyaltyMember: {type : Schema.ObjectId, ref: 'LoyaltyMember'},
  loyaltyPoint: {type : Schema.ObjectId, ref: 'LoyaltyPoint'},
  booking: {type : Schema.ObjectId, ref: 'Booking'},
  revenue: {type : Schema.ObjectId, ref: 'Revenue'},
  comments: {type : String},
  points: {type : Number},
  customer: {type : Schema.ObjectId, ref: 'Customer'},
  customer: {type: Schema.ObjectId, ref: 'Customer'},
  created: {type : Date},
  createdby: {type: Schema.ObjectId, ref: 'User'},
  modified: {type : Date},
  modifiedby: {type: Schema.ObjectId, ref: 'User'}
});
 
 LoyaltyTransactionSchema.statics = {
   load: function (id, cb) {
     this.findOne({ _id : id }).populate('loyaltyScheme loyaltyStatement loyaltyMember loyaltyPoint booking revenue customer').exec(cb);
   }
 };
 
=======
var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;
 
var LoyaltyTransactionSchema = new Schema({
  loyaltyScheme: {type: Schema.ObjectId, ref: 'LoyaltyScheme'},
  loyaltyStatement: {type: Schema.ObjectId, ref: 'LoyaltyStatement'},
  loyaltyMember: {type: Schema.ObjectId, ref: 'LoyaltyMember'},
  loyaltyPoint: {type: Schema.ObjectId, ref: 'LoyaltyPoint'},
  booking: {type: Schema.ObjectId, ref: 'Booking'},
  revenue: {type: Schema.ObjectId, ref: 'Revenue'},
  comments: {type : String},
  points: {type: Number},
  created: {type : Date},
  createdby: {type: Schema.ObjectId, ref: 'User'},
  modified: {type : Date},
  modifiedby: {type: Schema.ObjectId, ref: 'User'}
});
 
 LoyaltyTransactionSchema.statics = {
   load: function (id, cb) {
     this.findOne({ _id : id }).populate('loyaltyScheme').populate('loyaltyStatement').populate('loyaltyMember').populate('loyaltyPoint').populate('booking').populate('revenue').exec(cb);
   }
 };
 
>>>>>>> 05644ebd4e842c71a618037d6cf2402b08f74c73
mongoose.model('LoyaltyTransaction', LoyaltyTransactionSchema);