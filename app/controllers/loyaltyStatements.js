var mongoose = require('mongoose')
  , async = require('async')
  , LoyaltyStatement = mongoose.model('LoyaltyStatement')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var loyaltyStatement = new LoyaltyStatement(req.body)

  loyaltyStatement.loyaltyScheme = req.body.loyaltyScheme

  loyaltyStatement.createdby = req.user
  loyaltyStatement.created = new Date()

  loyaltyStatement.save()
  res.jsonp(loyaltyStatement)
}
 
exports.show = function(req, res){
  res.jsonp(req.loyaltyStatement);
}
 
exports.loyaltyStatement = function(req, res, next, id){
  var LoyaltyStatement = mongoose.model('LoyaltyStatement')
  LoyaltyStatement.load(id, function (err, loyaltyStatement) {
    if (err) return next(err)
    if (!loyaltyStatement) return next(new Error('Failed to load loyaltyStatement ' + id))
    req.loyaltyStatement = loyaltyStatement
    next()
  })
}
 
exports.all = function(req, res){
 LoyaltyStatement.find().populate('loyaltyScheme').exec(function(err, loyaltyStatements) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(loyaltyStatements);
   }
 });
}
 
exports.update = function(req, res){
  var loyaltyStatement = req.loyaltyStatement
  loyaltyStatement = _.extend(loyaltyStatement, req.body)

  loyaltyStatement.modifiedby = req.user
  loyaltyStatement.modified = new Date()
  
  loyaltyStatement.save(function(err) {
    res.jsonp(loyaltyStatement)
  })
}
 
exports.destroy = function(req, res){
  var loyaltyStatement = req.loyaltyStatement
  loyaltyStatement.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}