var mongoose = require('mongoose')
  , async = require('async')
  , Rawcompany = mongoose.model('Rawcompany')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var rawcompany = new Rawcompany(req.body)

  rawcompany.createdby = req.user
  rawcompany.created = new Date()

  rawcompany.save()
  res.jsonp(rawcompany)
}
 
exports.show = function(req, res){
  res.jsonp(req.rawcompany);
}
 
exports.rawcompany = function(req, res, next, id){
  var Rawcompany = mongoose.model('Rawcompany')
  Rawcompany.load(id, function (err, rawcompany) {
    if (err) return next(err)
    if (!rawcompany) return next(new Error('Failed to load rawcompany ' + id))
    req.rawcompany = rawcompany
    next()
  })
}
 
exports.all = function(req, res){
 Rawcompany.find().populate('country').populate('customer').populate('site').exec(function(err, customers) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(customers);
   }
 });
}
 
exports.update = function(req, res){
  var rawcompany = req.rawcompany
  rawcompany = _.extend(rawcompany, req.body)

  rawcompany.modifiedby = req.user
  rawcompany.modified = new Date()
  
  rawcompany.save(function(err) {
    res.jsonp(rawcompany)
  })
}
 
exports.destroy = function(req, res){
  var rawcompany = req.rawcompany
  rawcompany.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}