var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;
 
var PersonSchema = new Schema({
  title: {type: Schema.ObjectId, ref: 'Title'},
  firstname: {type : String},
  middlename: {type : String},
  lastname: {type : String},
  gender: {type : Number},
  dob: {type : Date},
  email: {type : String},
  homephone: {type : String},
  homeaddress1: {type : String},
  homeaddress2: {type : String},
  homeaddress3: {type : String},
  homesuburb: {type : String},
  homecity: {type : String},
  homepostcode: {type : String},
  homecountry: {type: Schema.ObjectId, ref: 'Country'},
  workphone: {type : String},
  workaddress1: {type : String},
  workaddress2: {type : String},
  workaddress3: {type : String},
  worksuburb: {type : String},
  workcity: {type : String},
  workpostcode: {type : String},
  workcountry: {type: Schema.ObjectId, ref: 'Country'},
  company: {type: Schema.ObjectId, ref: 'Company'},
  site: {type: Schema.ObjectId, ref: 'Site'},
  customer: {type: Schema.ObjectId, ref: 'Customer'},
  created: {type : Date},
  createdby: {type: Schema.ObjectId, ref: 'User'},
  modified: {type : Date},
  modifiedby: {type: Schema.ObjectId, ref: 'User'}
});
 
 PersonSchema.statics = {
   load: function (id, cb) {
     this.findOne({ _id : id }).populate('title').populate('homecountry').populate('workcountry').populate('company').populate('site').populate('customer').exec(cb);
   }
 };
 
mongoose.model('Person', PersonSchema);