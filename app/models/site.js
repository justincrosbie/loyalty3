var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;
 
var SiteSchema = new Schema({

  name: {type : String},
  customer: {type : Schema.ObjectId, ref: 'Customer'},
  latitude: {type : String},
  longitude: {type : String},
  customer: {type: Schema.ObjectId, ref: 'Customer'},
  created: {type : Date},
  createdby: {type: Schema.ObjectId, ref: 'User'},
  modified: {type : Date},
  modifiedby: {type: Schema.ObjectId, ref: 'User'}
});
 
 SiteSchema.statics = {
   load: function (id, cb) {
     this.findOne({ _id : id }).populate('customer').exec(cb);
   }
 };
 
mongoose.model('Site', SiteSchema);