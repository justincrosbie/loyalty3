var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;
 
var SubscriptionSchema = new Schema({

  name: {type : String},
  rate: {type : String},
  customer: {type: Schema.ObjectId, ref: 'Customer'},
  created: {type : Date},
  createdby: {type: Schema.ObjectId, ref: 'User'},
  modified: {type : Date},
  modifiedby: {type: Schema.ObjectId, ref: 'User'}
});
 
 SubscriptionSchema.statics = {
   load: function (id, cb) {
     this.findOne({ _id : id }).populate('').exec(cb);
   }
 };
 
mongoose.model('Subscription', SubscriptionSchema);