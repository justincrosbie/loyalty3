<<<<<<< HEAD
var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;
 
var CurrencySchema = new Schema({

  name: {type : String},
  iso: {type : String},
  symbol: {type : String},
  exchangerate: {type : Number},
  customer: {type: Schema.ObjectId, ref: 'Customer'},
  created: {type : Date},
  createdby: {type: Schema.ObjectId, ref: 'User'},
  modified: {type : Date},
  modifiedby: {type: Schema.ObjectId, ref: 'User'}
});
 
 CurrencySchema.statics = {
   load: function (id, cb) {
     this.findOne({ _id : id }).populate('').exec(cb);
   }
 };
 
=======
var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;
 
var CurrencySchema = new Schema({
  name: {type : String},
  isocode: {type : String},
  symbol: {type : String},
  created: {type : Date},
  createdby: {type: Schema.ObjectId, ref: 'User'},
  modified: {type : Date},
  modifiedby: {type: Schema.ObjectId, ref: 'User'}
});
 
 CurrencySchema.statics = {
   load: function (id, cb) {
     this.findOne({ _id : id }).exec(cb);
   }
 };
 
>>>>>>> 05644ebd4e842c71a618037d6cf2402b08f74c73
mongoose.model('Currency', CurrencySchema);