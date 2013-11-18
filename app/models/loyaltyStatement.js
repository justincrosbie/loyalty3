var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;
 
var LoyaltyStatementSchema = new Schema({

  loyaltyScheme: {type : Schema.ObjectId, ref: 'LoyaltyScheme'},
  name: {type : String},
  description: {type : String},
  code: {type : String},
  isactive: {type : Boolean},
  start: {type : Date},
  end: {type : Date},
  customer: {type : Schema.ObjectId, ref: 'Customer'},
  customer: {type: Schema.ObjectId, ref: 'Customer'},
  created: {type : Date},
  createdby: {type: Schema.ObjectId, ref: 'User'},
  modified: {type : Date},
  modifiedby: {type: Schema.ObjectId, ref: 'User'}
});
 
 LoyaltyStatementSchema.statics = {
   load: function (id, cb) {
     this.findOne({ _id : id }).populate('loyaltyScheme customer').exec(cb);
   }
 };
 
mongoose.model('LoyaltyStatement', LoyaltyStatementSchema);