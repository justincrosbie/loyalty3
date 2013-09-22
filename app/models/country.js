var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;
 
var CountrySchema = new Schema({
  isocode: {type : String},
  name: {type : String},
  idc: {type : String}
});
 
 CountrySchema.statics = {
   load: function (id, cb) {
     this.findOne({ _id : id }).exec(cb);
   }
 };
 
mongoose.model('Country', CountrySchema);