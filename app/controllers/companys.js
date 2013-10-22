var mongoose = require('mongoose')
  , async = require('async')
  , Company = mongoose.model('Company')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var company = new Company(req.body)

  company.createdby = req.user
  company.created = new Date()

  company.save()
  res.jsonp(company)
}
 
exports.show = function(req, res){
  res.jsonp(req.company);
}
 
exports.company = function(req, res, next, id){
  var Company = mongoose.model('Company')
  Company.load(id, function (err, company) {
    if (err) return next(err)
    if (!company) return next(new Error('Failed to load company ' + id))
    req.company = company
    next()
  })
}
 
exports.all = function(req, res){
 Company.find().populate('country').populate('customer').populate('site').exec(function(err, customers) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(customers);
   }
 });
}
 
exports.queryCount = function(req, res){
 Company.find(req.query.q).count().exec(function(err, count) {
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
    if ( req.query.q2.name ) {
      req.query.q.name = {};
      req.query.q.name.$regex = req.query.q2.name.regex;
      req.query.q.name.$options = req.query.q2.name.options;
    }
  }

  console.log(req.query);

 var runMainQuery = function() {

   Company.find(req.query.q).skip((req.query.page-1)*req.query.page_limit).limit(req.query.page_limit).populate('country').populate('customer').populate('site').exec(function(err, customers) {
     if (err) {
        res.render('error', {status: 500});
     } else {      
          responseObj.data = customers;
          res.jsonp(responseObj);
     }
   });
 }

 if ( req.query.page == 1 ) {
   Company.find(req.query.q).count().exec(function(err, count) {
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
  var company = req.company
  company = _.extend(company, req.body)

  company.modifiedby = req.user
  company.modified = new Date()
  
  company.save(function(err) {
    res.jsonp(company)
  })
}
 
exports.destroy = function(req, res){
  var company = req.company
  company.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}