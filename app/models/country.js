var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;
 
var CountrySchema = new Schema({

  name: {type : String},
  iso: {type : String},
  idc: {type : String},
  customer: {type: Schema.ObjectId, ref: 'Customer'},
  created: {type : Date},
  createdby: {type: Schema.ObjectId, ref: 'User'},
  modified: {type : Date},
  modifiedby: {type: Schema.ObjectId, ref: 'User'}
});
 
 CountrySchema.statics = {
   load: function (id, cb) {
     this.findOne({ _id : id }).populate('').exec(cb);
   }
 };
 
mongoose.model('Country', CountrySchema);