var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;
 
var BookingSchema = new Schema({

  code: {type : String},
  status: {type : Schema.ObjectId, ref: 'Bookingstatus'},
  type: {type : Schema.ObjectId, ref: 'Bookingtype'},
  datebooked: {type : Date},
  start: {type : Date},
  end: {type : Date},
  room: {type : Schema.ObjectId, ref: 'Room'},
  comments: {type : String},
  ratecode: {type : Schema.ObjectId, ref: 'Ratecode'},
  marketcode: {type : Schema.ObjectId, ref: 'Marketcode'},
  channel: {type : Schema.ObjectId, ref: 'Channel'},
  sob: {type : Schema.ObjectId, ref: 'Sob'},
  person: {type : Schema.ObjectId, ref: 'Rawperson'},
  company: {type : Schema.ObjectId, ref: 'Rawcompany'},
  site: {type : Schema.ObjectId, ref: 'Site'},
  datasource: {type : Schema.ObjectId, ref: 'Datasource'},
  customer: {type : Schema.ObjectId, ref: 'Customer'},
  customer: {type: Schema.ObjectId, ref: 'Customer'},
  created: {type : Date},
  createdby: {type: Schema.ObjectId, ref: 'User'},
  modified: {type : Date},
  modifiedby: {type: Schema.ObjectId, ref: 'User'}
});
 
 BookingSchema.statics = {
   load: function (id, cb) {
     this.findOne({ _id : id }).populate('bookingstatus bookingtype room ratecode marketcode channel sob person company site datasource customer').exec(cb);
   }
 };
 
mongoose.model('Booking', BookingSchema);