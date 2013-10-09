var mongoose = require('mongoose')
  , async = require('async')
  , Revenue = mongoose.model('Revenue')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var revenue = new Revenue(req.body)

  revenue.createdby = req.user
  revenue.created = new Date()

  revenue.save()
  res.jsonp(revenue)
}
 
exports.show = function(req, res){
  res.jsonp(req.revenue);
}
 
exports.revenue = function(req, res, next, id){
  var Revenue = mongoose.model('Revenue')
  Revenue.load(id, function (err, revenue) {
    if (err) return next(err)
    if (!revenue) return next(new Error('Failed to load revenue ' + id))
    req.revenue = revenue
    next()
  })
}
 
exports.all = function(req, res){
 Revenue.find().populate('booking').populate('currency').populate('site').populate('customer').exec(function(err, revenues) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(revenues);
   }
 });
}
 
exports.update = function(req, res){
  var revenue = req.revenue
  revenue = _.extend(revenue, req.body)

  revenue.modifiedby = req.user
  revenue.modified = new Date()
  
  revenue.save(function(err) {
    res.jsonp(revenue)
  })
}
 
exports.destroy = function(req, res){
  var revenue = req.revenue
  revenue.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}