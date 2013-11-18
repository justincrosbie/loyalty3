<<<<<<< HEAD
var mongoose = require('mongoose')
  , async = require('async')
  , Country = mongoose.model('Country')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var country = new Country(req.body)

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
 Country.find().populate('').exec(function(err, countrys) {
   if (err) {
   		console.log(err);
      res.render('error', {status: 500});
   } else {      
      res.jsonp(countrys);
   }
 });
}
 
exports.queryCount = function(req, res){
 Country.find(req.query.q).count().exec(function(err, count) {
   if (err) {
   		console.log(err);
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

    for ( f in req.query.q2 ) {
      if ( req.query.q2[f].regex ) {
        if ( !req.query.q[f] ) {
          req.query.q[f] = {};
        }
        req.query.q[f].$regex = req.query.q2[f].regex;
      }
      if ( req.query.q2[f].options ) {
        if ( !req.query.q[f] ) {
          req.query.q[f] = {};
        }
        req.query.q[f].$options = req.query.q2[f].options;
      }
    }
  
  }

  var sort_field = req.query.sort_field;
  var sort_order = req.query.sort_order;

  var sort_params = {};
  if ( sort_field ) {
  	sort_params[sort_field] = sort_order;
  } else {
  	sort_params = { $natural: -1 };
  }

 var runMainQuery = function() {
 
   if ( !req.query.q ) {
     req.query.q = {};
   }
   if ( !req.query.page ) {
     req.query.page = 1;
   }
   if ( !req.query.page_limit ) {
     req.query.page_limit = 100;
   }

   Country.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('')
        .exec(function(err, countrys) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = countrys;
          res.jsonp(responseObj);
     }
   });
 }
 
 console.log("================== req.query ====================");
 console.log(req.query);
 console.log("================== req.query ====================");

 if ( req.query.page == 1 ) {
   Country.find(req.query.q).count().exec(function(err, count) {
     if (err) {
   		console.log(err);
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
   		console.log(err);
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
=======
var mongoose = require('mongoose')
  , async = require('async')
  , Country = mongoose.model('Country')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var country = new Country(req.body)

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
>>>>>>> 05644ebd4e842c71a618037d6cf2402b08f74c73
}