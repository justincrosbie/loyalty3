var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;
 
var RevenuecodeSchema = new Schema({

  name: {type : String},
  code: {type : String},
  description: {type : String},
  revenuetype: {type : Schema.ObjectId, ref: 'Revenuetype'},
  site: {type : Schema.ObjectId, ref: 'Site'},
  datasource: {type : Schema.ObjectId, ref: 'Datasource'},
  customer: {type : Schema.ObjectId, ref: 'Customer'},
  customer: {type: Schema.ObjectId, ref: 'Customer'},
  created: {type : Date},
  createdby: {type: Schema.ObjectId, ref: 'User'},
  modified: {type : Date},
  modifiedby: {type: Schema.ObjectId, ref: 'User'}
});
 
 RevenuecodeSchema.statics = {
   load: function (id, cb) {
     this.findOne({ _id : id }).populate('revenuetype site datasource customer').exec(cb);
   }
 };
 
mongoose.model('Revenuecode', RevenuecodeSchema);