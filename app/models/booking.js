var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;
 
var BookingSchema = new Schema({
  code: {type : String},
  datebooked: {type : Date},
  start: {type : Date},
  end: {type : Date},
  rawperson: {type: Schema.ObjectId, ref: 'Rawperson'},
  rawcompany: {type: Schema.ObjectId, ref: 'Rawcompany'},
  site: {type: Schema.ObjectId, ref: 'Site'},
  customer: {type: Schema.ObjectId, ref: 'Customer'},
  created: {type : Date},
  createdby: {type: Schema.ObjectId, ref: 'User'},
  modified: {type : Date},
  modifiedby: {type: Schema.ObjectId, ref: 'User'}
});
 
 BookingSchema.statics = {
   load: function (id, cb) {
     this.findOne({ _id : id }).populate('rawperson').populate('rawcompany').exec(cb);
   }
 };
 
mongoose.model('Booking', BookingSchema);