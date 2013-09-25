var mongoose = require('mongoose')
  , async = require('async')
  , Country = mongoose.model('Country')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var country = new Country(req.body)

  country.currency = req.body.currency

  country.createdby = req.user
  country.created = new Date()

  country.save()
  res.jsonp(country)
}
 
exports.show = function(req, res){
  res.jsonp(req.country);
}
 
exports.country = function(req, res, next, id){
  var Country = mongoose.model('Country')
  Country.load(id, function (err, country) {
    if (err) return next(err)
    if (!country) return next(new Error('Failed to load country ' + id))
    req.country = country
    next()
  })
}
 
exports.all = function(req, res){
 Country.find().populate('currency').exec(function(err, countrys) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(countrys);
   }
 });
}
 
exports.update = function(req, res){
  var country = req.country
  country = _.extend(country, req.body)

  country.modifiedby = req.user
  country.modified = new Date()
  
  country.save(function(err) {
    res.jsonp(country)
  })
}
 
exports.destroy = function(req, res){
  var country = req.country
  country.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}