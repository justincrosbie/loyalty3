var mongoose = require('mongoose')
  , async = require('async')
  , Site = mongoose.model('Site')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var site = new Site(req.body)

  site.createdby = req.user
  site.created = new Date()

  site.save()
  res.jsonp(site)
}
 
exports.show = function(req, res){
  res.jsonp(req.site);
}
 
exports.site = function(req, res, next, id){
  var Site = mongoose.model('Site')
  Site.load(id, function (err, site) {
    if (err) return next(err)
    if (!site) return next(new Error('Failed to load site ' + id))
    req.site = site
    next()
  })
}
 
exports.all = function(req, res){
 Site.find().populate('customer').exec(function(err, sites) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(sites);
   }
 });
}
 
exports.update = function(req, res){
  var site = req.site
  site = _.extend(site, req.body)

  site.modifiedby = req.user
  site.modified = new Date()
  
  site.save(function(err) {
    res.jsonp(site)
  })
}
 
exports.destroy = function(req, res){
  var site = req.site
  site.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}