var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;
 
var LoyaltyMemberSchema = new Schema({
  loyaltyScheme: {type: Schema.ObjectId, ref: 'LoyaltyScheme'},
  person: {type: Schema.ObjectId, ref: 'Person'},
  card: {type : String},
  password: {type : String},
  start: {type : Date},
  end: {type : Date},
  created: {type : Date},
  createdby: {type: Schema.ObjectId, ref: 'User'},
  modified: {type : Date},
  modifiedby: {type: Schema.ObjectId, ref: 'User'}
});
 
 LoyaltyMemberSchema.statics = {
   load: function (id, cb) {
     this.findOne({ _id : id }).populate('person').populate('loyaltyScheme').exec(cb);
   }
 };
 
mongoose.model('LoyaltyMember', LoyaltyMemberSchema);