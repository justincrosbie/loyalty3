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
 Person.find().populate('title').populate('company').populate('homecountry').populate('workcountry').populate('customer').populate('site').exec(function(err, customers) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(customers);
   }
 });
}
 
exports.queryCount = function(req, res){
 Person.find(req.query.q).count().exec(function(err, count) {
   if (err) {
      res.render('error', {status: 500});
   } else {    
      res.jsonp(count);
   }
 });
}
 
exports.query = function(req, res){

 var responseObj = {};

  if ( req.query.q2 ) {
    req.query.q2 = eval('('+req.query.q2+')');
    req.query.q = {};
    if ( req.query.q2.firstname ) {
      req.query.q.firstname = {};
      req.query.q.firstname.$regex = req.query.q2.firstname.regex;
      req.query.q.firstname.$options = req.query.q2.firstname.options;
    }
    if ( req.query.q2.lastname ) {
      req.query.q.lastname = {};
      req.query.q.lastname.$regex = req.query.q2.lastname.regex;
      req.query.q.lastname.$options = req.query.q2.lastname.options;
    }
    if ( req.query.q2.customer ) {
      req.query.q.customer = req.query.q2.customer;
    }
    if ( req.query.q2.site ) {
      req.query.q.site = req.query.q2.site;
    }
  }

  console.log(req.query);

  var sort_field = req.query.sort_field;
  var sort_order = req.query.sort_order;

  //var sort_params = (sort_field == 'firstname' ? {firstname: sort_order} : (sort_field == 'dob' ? {dob: sort_order} : {}));
  var sort_params = {};
  sort_params[sort_field] = sort_order;

 var runMainQuery = function() {

   Person.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('title').populate('company').populate('homecountry').populate('workcountry').populate('customer').populate('site')
        .exec(function(err, customers) {
     if (err) {
        res.render('error', {status: 500});
     } else {      
          responseObj.data = customers;
          res.jsonp(responseObj);
     }
   });
 }

 if ( req.query.page == 1 ) {
   Person.find(req.query.q).count().exec(function(err, count) {
     if (err) {
        res.render('error', {status: 500});
     } else {
        responseObj.count = count;
        runMainQuery();
     }
   });
 } else {
    runMainQuery();
 }  
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