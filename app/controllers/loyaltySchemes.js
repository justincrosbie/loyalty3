var mongoose = require('mongoose')
  , async = require('async')
  , LoyaltyScheme = mongoose.model('LoyaltyScheme')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var loyaltyScheme = new LoyaltyScheme(req.body)

  loyaltyScheme.createdby = req.user
  loyaltyScheme.created = new Date()

  loyaltyScheme.save()
  res.jsonp(loyaltyScheme)
}
 
exports.show = function(req, res){
  res.jsonp(req.loyaltyScheme);
}
 
exports.loyaltyScheme = function(req, res, next, id){
  var LoyaltyScheme = mongoose.model('LoyaltyScheme')
  LoyaltyScheme.load(id, function (err, loyaltyScheme) {
    if (err) return next(err)
    if (!loyaltyScheme) return next(new Error('Failed to load loyaltyScheme ' + id))
    req.loyaltyScheme = loyaltyScheme
    next()
  })
}
 
exports.all = function(req, res){
 LoyaltyScheme.find().exec(function(err, loyaltySchemes) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(loyaltySchemes);
   }
 });
}
 
exports.update = function(req, res){
  var loyaltyScheme = req.loyaltyScheme
  loyaltyScheme = _.extend(loyaltyScheme, req.body)

  loyaltyScheme.modifiedby = req.user
  loyaltyScheme.modified = new Date()
  
  loyaltyScheme.save(function(err) {
    res.jsonp(loyaltyScheme)
  })
}
 
exports.destroy = function(req, res){
  var loyaltyScheme = req.loyaltyScheme
  loyaltyScheme.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}