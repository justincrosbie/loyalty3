var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;
 
var RevenueSchema = new Schema({
  code: {type : String},
  datespent: {type : Date},
  amount: {type : Number},
  currency: {type: Schema.ObjectId, ref: 'Currency'},
  booking: {type: Schema.ObjectId, ref: 'Booking'},
  site: {type: Schema.ObjectId, ref: 'Site'},
  customer: {type: Schema.ObjectId, ref: 'Customer'},
  created: {type : Date},
  createdby: {type: Schema.ObjectId, ref: 'User'},
  modified: {type : Date},
  modifiedby: {type: Schema.ObjectId, ref: 'User'}
});
 
 RevenueSchema.statics = {
   load: function (id, cb) {
     this.findOne({ _id : id }).populate('booking').populate('currency').populate('site').populate('customer').exec(cb);
   }
 };
 
mongoose.model('Revenue', RevenueSchema);