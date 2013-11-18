var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;
 
var LoyaltyMemberSchema = new Schema({

  loyaltyScheme: {type : Schema.ObjectId, ref: 'LoyaltyScheme'},
  code: {type : String},
  person: {type : Schema.ObjectId, ref: 'Person'},
  isactive: {type : Boolean},
  start: {type : Date},
  end: {type : Date},
  password: {type : String},
  customer: {type : Schema.ObjectId, ref: 'Customer'},
  customer: {type: Schema.ObjectId, ref: 'Customer'},
  created: {type : Date},
  createdby: {type: Schema.ObjectId, ref: 'User'},
  modified: {type : Date},
  modifiedby: {type: Schema.ObjectId, ref: 'User'}
});
 
 LoyaltyMemberSchema.statics = {
   load: function (id, cb) {
     this.findOne({ _id : id }).populate('loyaltyScheme person customer').exec(cb);
   }
 };
 
mongoose.model('LoyaltyMember', LoyaltyMemberSchema);