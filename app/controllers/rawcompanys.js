<<<<<<< HEAD
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
 Rawcompany.find().populate('country customer site').exec(function(err, rawcompanys) {
   if (err) {
   		console.log(err);
      res.render('error', {status: 500});
   } else {      
      res.jsonp(rawcompanys);
   }
 });
}
 
exports.queryCount = function(req, res){
 Rawcompany.find(req.query.q).count().exec(function(err, count) {
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
  
    if ( req.query.q2.country ) {
      req.query.q.country = req.query.q2.country;
    }
    if ( req.query.q2.customer ) {
      req.query.q.customer = req.query.q2.customer;
    }
    if ( req.query.q2.site ) {
      req.query.q.site = req.query.q2.site;
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

   Rawcompany.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('country customer site')
        .exec(function(err, rawcompanys) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = rawcompanys;
          res.jsonp(responseObj);
     }
   });
 }
 
 console.log("================== req.query ====================");
 console.log(req.query);
 console.log("================== req.query ====================");

 if ( req.query.page == 1 ) {
   Rawcompany.find(req.query.q).count().exec(function(err, count) {
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
  var rawcompany = req.rawcompany
  

  
	  if ( req.body.country ) {
	    req.body.country = req.body.country._id;
	  }
	  if ( req.body.customer ) {
	    req.body.customer = req.body.customer._id;
	  }
	  if ( req.body.site ) {
	    req.body.site = req.body.site._id;
	  }
          
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
   		console.log(err);
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
=======
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
>>>>>>> 05644ebd4e842c71a618037d6cf2402b08f74c73
}