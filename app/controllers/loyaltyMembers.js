var mongoose = require('mongoose')
  , async = require('async')
  , LoyaltyMember = mongoose.model('LoyaltyMember')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var loyaltyMember = new LoyaltyMember(req.body)

  loyaltyMember.person = req.body.person
  loyaltyMember.loyaltyScheme = req.body.loyaltyScheme

  loyaltyMember.createdby = req.user
  loyaltyMember.created = new Date()

  loyaltyMember.save()
  res.jsonp(loyaltyMember)
}
 
exports.show = function(req, res){
  res.jsonp(req.loyaltyMember);
}
 
exports.loyaltyMember = function(req, res, next, id){
  var LoyaltyMember = mongoose.model('LoyaltyMember')
  LoyaltyMember.load(id, function (err, loyaltyMember) {
    if (err) return next(err)
    if (!loyaltyMember) return next(new Error('Failed to load loyaltyMember ' + id))
    req.loyaltyMember = loyaltyMember
    next()
  })
}
 
exports.all = function(req, res){
 LoyaltyMember.find().populate('person').populate('loyaltyScheme').exec(function(err, loyaltyMembers) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(loyaltyMembers);
   }
 });
}
 
exports.update = function(req, res){
  var loyaltyMember = req.loyaltyMember
  loyaltyMember = _.extend(loyaltyMember, req.body)

  loyaltyMember.modifiedby = req.user
  loyaltyMember.modified = new Date()
  
  loyaltyMember.save(function(err) {
    res.jsonp(loyaltyMember)
  })
}
 
exports.destroy = function(req, res){
  var loyaltyMember = req.loyaltyMember
  loyaltyMember.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}