var mongoose = require('mongoose')
  , async = require('async')
  , Currency = mongoose.model('Currency')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var currency = new Currency(req.body)

  currency.createdby = req.user
  currency.created = new Date()

  currency.save()
  res.jsonp(currency)
}
 
exports.show = function(req, res){
  res.jsonp(req.currency);
}
 
exports.currency = function(req, res, next, id){
  var Currency = mongoose.model('Currency')
  Currency.load(id, function (err, currency) {
    if (err) return next(err)
    if (!currency) return next(new Error('Failed to load currency ' + id))
    req.currency = currency
    next()
  })
}
 
exports.all = function(req, res){
 Currency.find().exec(function(err, countrys) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(countrys);
   }
 });
}
 
exports.update = function(req, res){
  var currency = req.currency
  currency = _.extend(currency, req.body)

  currency.modifiedby = req.user
  currency.modified = new Date()
  
  currency.save(function(err) {
    res.jsonp(currency)
  })
}
 
exports.destroy = function(req, res){
  var currency = req.currency
  currency.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}