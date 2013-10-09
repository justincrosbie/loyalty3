var mongoose = require('mongoose')
  , async = require('async')
  , Rawperson = mongoose.model('Rawperson')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var rawperson = new Rawperson(req.body)

  rawperson.createdby = req.user
  rawperson.created = new Date()

  rawperson.save()
  res.jsonp(rawperson)
}
 
exports.show = function(req, res){
  res.jsonp(req.rawperson);
}
 
exports.rawperson = function(req, res, next, id){
  var Rawperson = mongoose.model('Rawperson')
  Rawperson.load(id, function (err, rawperson) {
    if (err) return next(err)
    if (!rawperson) return next(new Error('Failed to load rawperson ' + id))

    req.rawperson = rawperson
    next()
  })
}
 
exports.all = function(req, res){
 Rawperson.find().populate('title').populate('rawcompany').populate('homecountry').populate('workcountry').populate('customer').populate('site').exec(function(err, customers) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(customers);
   }
 });
}
 
exports.update = function(req, res){
  var rawperson = req.rawperson
  rawperson = _.extend(rawperson, req.body)

  rawperson.modifiedby = req.user
  rawperson.modified = new Date()
  
  rawperson.save(function(err) {
    res.jsonp(rawperson)
  })
}
 
exports.destroy = function(req, res){
  var rawperson = req.rawperson
  rawperson.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}