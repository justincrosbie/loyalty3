var mongoose = require('mongoose')
  , async = require('async')
  , LoyaltyScheme = mongoose.model('LoyaltyScheme')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var loyaltyScheme = new LoyaltyScheme(req.body)

  loyaltyScheme.createdby = req.user
  loyaltyScheme.created = new Date()

  loyaltyScheme.save()
  res.jsonp(loyaltyScheme)
}
 
exports.show = function(req, res){
  res.jsonp(req.loyaltyScheme);
}
 
exports.loyaltyScheme = function(req, res, next, id){
  var LoyaltyScheme = mongoose.model('LoyaltyScheme')
  LoyaltyScheme.load(id, function (err, loyaltyScheme) {
    if (err) return next(err)
    if (!loyaltyScheme) return next(new Error('Failed to load loyaltyScheme ' + id))
    req.loyaltyScheme = loyaltyScheme
    next()
  })
}
 
exports.all = function(req, res){
 LoyaltyScheme.find().populate('customer').exec(function(err, loyaltySchemes) {
   if (err) {
   		console.log(err);
      res.render('error', {status: 500});
   } else {      
      res.jsonp(loyaltySchemes);
   }
 });
}
 
exports.queryCount = function(req, res){
 LoyaltyScheme.find(req.query.q).count().exec(function(err, count) {
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
  
    if ( req.query.q2.customer ) {
      req.query.q.customer = req.query.q2.customer;
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

   LoyaltyScheme.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('customer')
        .exec(function(err, loyaltySchemes) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = loyaltySchemes;
          res.jsonp(responseObj);
     }
   });
 }
 
 console.log("================== req.query ====================");
 console.log(req.query);
 console.log("================== req.query ====================");

 if ( req.query.page == 1 ) {
   LoyaltyScheme.find(req.query.q).count().exec(function(err, count) {
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
  var loyaltyScheme = req.loyaltyScheme
  

  
	  if ( req.body.customer ) {
	    req.body.customer = req.body.customer._id;
	  }
          
  loyaltyScheme = _.extend(loyaltyScheme, req.body)

  loyaltyScheme.modifiedby = req.user
  loyaltyScheme.modified = new Date()
  
  loyaltyScheme.save(function(err) {
    res.jsonp(loyaltyScheme)
  })
}
 
exports.destroy = function(req, res){
  var loyaltyScheme = req.loyaltyScheme
  loyaltyScheme.remove(function(err){
    if (err) {
   		console.log(err);
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}