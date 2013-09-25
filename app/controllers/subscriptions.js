var mongoose = require('mongoose')
  , async = require('async')
  , Subscription = mongoose.model('Subscription')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var subscription = new Subscription(req.body)

  subscription.createdby = req.user
  subscription.created = new Date()

  subscription.save()
  res.jsonp(subscription)
}
 
exports.show = function(req, res){
  res.jsonp(req.subscription);
}
 
exports.subscription = function(req, res, next, id){
  var Subscription = mongoose.model('Subscription')
  Subscription.load(id, function (err, subscription) {
    if (err) return next(err)
    if (!subscription) return next(new Error('Failed to load subscription ' + id))
    req.subscription = subscription
    next()
  })
}
 
exports.all = function(req, res){
 Subscription.find().exec(function(err, subscriptions) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(subscriptions);
   }
 });
}
 
exports.update = function(req, res){
  var subscription = req.subscription
  subscription = _.extend(subscription, req.body)

  subscription.modifiedby = req.user
  subscription.modified = new Date()
  
  subscription.save(function(err) {
    res.jsonp(subscription)
  })
}
 
exports.destroy = function(req, res){
  var subscription = req.subscription
  subscription.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}