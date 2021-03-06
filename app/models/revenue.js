var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;
 
var RevenueSchema = new Schema({

  code: {type : String},
  datespent: {type : Date},
  comments: {type : String},
  amount: {type : Number},
  quantity: {type : Number},
  currency: {type : Schema.ObjectId, ref: 'Currency'},
  booking: {type : Schema.ObjectId, ref: 'Booking'},
  paymenttype: {type : Schema.ObjectId, ref: 'Paymenttype'},
  revenuecode: {type : Schema.ObjectId, ref: 'Revenuecode'},
  site: {type : Schema.ObjectId, ref: 'Site'},
  datasource: {type : Schema.ObjectId, ref: 'Datasource'},
  customer: {type : Schema.ObjectId, ref: 'Customer'},
  customer: {type: Schema.ObjectId, ref: 'Customer'},
  created: {type : Date},
  createdby: {type: Schema.ObjectId, ref: 'User'},
  modified: {type : Date},
  modifiedby: {type: Schema.ObjectId, ref: 'User'}
});
 
 RevenueSchema.statics = {
   load: function (id, cb) {
     this.findOne({ _id : id }).populate('currency booking paymenttype revenuecode site datasource customer').exec(cb);
   }
 };
 
mongoose.model('Revenue', RevenueSchema);