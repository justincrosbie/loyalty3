var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;
 
var DatasourceSchema = new Schema({

  name: {type : String},
  datasourcetype: {type : Schema.ObjectId, ref: 'Datasourcetype'},
  customer: {type : Schema.ObjectId, ref: 'Customer'},
  connectstr: {type : String},
  username: {type : String},
  password: {type : String},
  customer: {type: Schema.ObjectId, ref: 'Customer'},
  created: {type : Date},
  createdby: {type: Schema.ObjectId, ref: 'User'},
  modified: {type : Date},
  modifiedby: {type: Schema.ObjectId, ref: 'User'}
});
 
 DatasourceSchema.statics = {
   load: function (id, cb) {
     this.findOne({ _id : id }).populate('datasourcetype customer').exec(cb);
   }
 };
 
mongoose.model('Datasource', DatasourceSchema);