var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;
 
var BookingtypeSchema = new Schema({

  name: {type : String},
  code: {type : String},
  description: {type : String},
  customer: {type : Schema.ObjectId, ref: 'Customer'},
  customer: {type: Schema.ObjectId, ref: 'Customer'},
  created: {type : Date},
  createdby: {type: Schema.ObjectId, ref: 'User'},
  modified: {type : Date},
  modifiedby: {type: Schema.ObjectId, ref: 'User'}
});
 
 BookingtypeSchema.statics = {
   load: function (id, cb) {
     this.findOne({ _id : id }).populate('customer').exec(cb);
   }
 };
 
mongoose.model('Bookingtype', BookingtypeSchema);