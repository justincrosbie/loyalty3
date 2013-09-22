var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;
 
var SiteSchema = new Schema({
  name: {type : String}
});
 
 SiteSchema.statics = {
   load: function (id, cb) {
     this.findOne({ _id : id }).exec(cb);
   }
 };
 
mongoose.model('Site', SiteSchema);