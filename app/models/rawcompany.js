<<<<<<< HEAD
var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;
 
var RawcompanySchema = new Schema({

  name: {type : String},
  email: {type : String},
  phone: {type : String},
  address1: {type : String},
  address2: {type : String},
  address3: {type : String},
  suburb: {type : String},
  city: {type : String},
  postcode: {type : String},
  country: {type : Schema.ObjectId, ref: 'Country'},
  customer: {type : Schema.ObjectId, ref: 'Customer'},
  site: {type : Schema.ObjectId, ref: 'Site'},
  customer: {type: Schema.ObjectId, ref: 'Customer'},
  created: {type : Date},
  createdby: {type: Schema.ObjectId, ref: 'User'},
  modified: {type : Date},
  modifiedby: {type: Schema.ObjectId, ref: 'User'}
});
 
 RawcompanySchema.statics = {
   load: function (id, cb) {
     this.findOne({ _id : id }).populate('country customer site').exec(cb);
   }
 };
 
=======
var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;
 
var RawcompanySchema = new Schema({
  code: {type : String},
  name: {type : String},
  iata: {type : String},
  email: {type : String},
  phone: {type : String},
  address1: {type : String},
  address2: {type : String},
  address3: {type : String},
  suburb: {type : String},
  city: {type : String},
  postcode: {type : String},
  country: {type: Schema.ObjectId, ref: 'Country'},
  site: {type: Schema.ObjectId, ref: 'Site'},
  customer: {type: Schema.ObjectId, ref: 'Customer'},
  created: {type : Date},
  createdby: {type: Schema.ObjectId, ref: 'User'},
  modified: {type : Date},
  modifiedby: {type: Schema.ObjectId, ref: 'User'}
});
 
 RawcompanySchema.statics = {
   load: function (id, cb) {
     this.findOne({ _id : id }).populate('country').populate('site').populate('customer').exec(cb);
   }
 };
 
>>>>>>> 05644ebd4e842c71a618037d6cf2402b08f74c73
mongoose.model('Rawcompany', RawcompanySchema);