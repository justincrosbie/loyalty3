var mongoose = require('mongoose')
  , async = require('async')
  , Title = mongoose.model('Title')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var title = new Title(req.body)

  title.createdby = req.user
  title.created = new Date()

  title.save()
  res.jsonp(title)
}
 
exports.show = function(req, res){
  res.jsonp(req.title);
}
 
exports.title = function(req, res, next, id){
  var Title = mongoose.model('Title')
  Title.load(id, function (err, title) {
    if (err) return next(err)
    if (!title) return next(new Error('Failed to load title ' + id))
    req.title = title
    next()
  })
}
 
exports.all = function(req, res){
 Title.find().exec(function(err, titles) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(titles);
   }
 });
}
 
exports.update = function(req, res){
  var title = req.title
  title = _.extend(title, req.body)

  title.modifiedby = req.user
  title.modified = new Date()
  
  title.save(function(err) {
    res.jsonp(title)
  })
}
 
exports.destroy = function(req, res){
  var title = req.title
  title.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}