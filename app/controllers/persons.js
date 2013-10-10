var mongoose = require('mongoose')
  , async = require('async')
  , Person = mongoose.model('Person')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var person = new Person(req.body)

  person.createdby = req.user
  person.created = new Date()

  person.save()
  res.jsonp(person)
}
 
exports.show = function(req, res){
  res.jsonp(req.person);
}
 
exports.person = function(req, res, next, id){
  var Person = mongoose.model('Person')
  Person.load(id, function (err, person) {
    if (err) return next(err)
    if (!person) return next(new Error('Failed to load person ' + id))
    req.person = person
    next()
  })
}
 
exports.all = function(req, res){
  console.log('exports.all');
  console.log(req.query);
 Person.find().populate('title').populate('company').populate('homecountry').populate('workcountry').populate('customer').populate('site').exec(function(err, customers) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(customers);
   }
 });
}
 
exports.query = function(req, res){
  console.log('exports.query!!');
  console.log(req.query);

 Person.find(req.query.q).skip((req.query.page-1)*req.query.page_limit).limit(req.query.page_limit).populate('title').populate('company').populate('homecountry').populate('workcountry').populate('customer').populate('site').exec(function(err, customers) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(customers);
   }
 });
}
 
exports.update = function(req, res){
  var person = req.person
  person = _.extend(person, req.body)

  person.modifiedby = req.user
  person.modified = new Date()
  
  person.save(function(err) {
    res.jsonp(person)
  })
}
 
exports.destroy = function(req, res){
  var person = req.person
  person.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}