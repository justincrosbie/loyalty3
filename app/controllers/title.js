var mongoose = require('mongoose')
  , async = require('async')
  , Title = mongoose.model('Title')
  , _ = require('underscore')
 
exports.show = function(req, res){
  res.jsonp(req.league);
}
 
exports.title = function(req, res, next, id){
  var Title = mongoose.model('Title')
 
  Title.load(id, function (err, title) {
    if (err) return next(err)
    if (!title) return next(new Error('Failed to load title' + id))
    req.title = title
    next()
  })
}
 
exports.all = function(req, res){
  Title.find(function(err, titles) {
    if (err) {
      res.render('error', {status: 500});
    } else {			
      res.jsonp(titles);
    }
  });
}