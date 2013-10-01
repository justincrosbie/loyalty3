var mongoose = require('mongoose')
  , async = require('async')
  , LoyaltyPoint = mongoose.model('LoyaltyPoint')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var loyaltyPoint = new LoyaltyPoint(req.body)

  loyaltyPoint.loyaltyScheme = req.body.loyaltyScheme

  loyaltyPoint.createdby = req.user
  loyaltyPoint.created = new Date()

  loyaltyPoint.save()
  res.jsonp(loyaltyPoint)
}
 
exports.show = function(req, res){
  res.jsonp(req.loyaltyPoint);
}
 
exports.loyaltyPoint = function(req, res, next, id){
  var LoyaltyPoint = mongoose.model('LoyaltyPoint')
  LoyaltyPoint.load(id, function (err, loyaltyPoint) {
    if (err) return next(err)
    if (!loyaltyPoint) return next(new Error('Failed to load loyaltyPoint ' + id))
    req.loyaltyPoint = loyaltyPoint
    next()
  })
}
 
exports.all = function(req, res){
 LoyaltyPoint.find().populate('loyaltyScheme').exec(function(err, loyaltyPoints) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(loyaltyPoints);
   }
 });
}
 
exports.update = function(req, res){
  var loyaltyPoint = req.loyaltyPoint
  loyaltyPoint = _.extend(loyaltyPoint, req.body)

  loyaltyPoint.modifiedby = req.user
  loyaltyPoint.modified = new Date()
  
  loyaltyPoint.save(function(err) {
    res.jsonp(loyaltyPoint)
  })
}
 
exports.destroy = function(req, res){
  var loyaltyPoint = req.loyaltyPoint
  loyaltyPoint.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}