var mongoose = require('mongoose')
  , async = require('async')
  , LoyaltyTransaction = mongoose.model('LoyaltyTransaction')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var loyaltyTransaction = new LoyaltyTransaction(req.body)

  loyaltyTransaction.createdby = req.user
  loyaltyTransaction.created = new Date()

  loyaltyTransaction.save()
  res.jsonp(loyaltyTransaction)
}
 
exports.show = function(req, res){
  res.jsonp(req.loyaltyTransaction);
}
 
exports.loyaltyTransaction = function(req, res, next, id){
  var LoyaltyTransaction = mongoose.model('LoyaltyTransaction')
  LoyaltyTransaction.load(id, function (err, loyaltyTransaction) {
    if (err) return next(err)
    if (!loyaltyTransaction) return next(new Error('Failed to load loyaltyTransaction ' + id))
    req.loyaltyTransaction = loyaltyTransaction
    next()
  })
}
 
exports.all = function(req, res){
 LoyaltyTransaction.find().populate('loyaltyScheme').populate('loyaltyMember').populate('loyaltyPoint').populate('loyaltyStatement').populate('booking').populate('revenue').exec(function(err, loyaltyTransactions) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(loyaltyTransactions);
   }
 });
}
 
exports.update = function(req, res){
  var loyaltyTransaction = req.loyaltyTransaction
  loyaltyTransaction = _.extend(loyaltyTransaction, req.body)

  loyaltyTransaction.modifiedby = req.user
  loyaltyTransaction.modified = new Date()
  
  loyaltyTransaction.save(function(err) {
    res.jsonp(loyaltyTransaction)
  })
}
 
exports.destroy = function(req, res){
  var loyaltyTransaction = req.loyaltyTransaction
  loyaltyTransaction.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}