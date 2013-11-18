<<<<<<< HEAD
var mongoose = require('mongoose')
  , async = require('async')
  , LoyaltyPoint = mongoose.model('LoyaltyPoint')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var loyaltyPoint = new LoyaltyPoint(req.body)

  loyaltyPoint.createdby = req.user
  loyaltyPoint.created = new Date()

  loyaltyPoint.save()
  res.jsonp(loyaltyPoint)
}
 
exports.show = function(req, res){
  res.jsonp(req.loyaltyPoint);
}
 
exports.loyaltyPoint = function(req, res, next, id){
  var LoyaltyPoint = mongoose.model('LoyaltyPoint')
  LoyaltyPoint.load(id, function (err, loyaltyPoint) {
    if (err) return next(err)
    if (!loyaltyPoint) return next(new Error('Failed to load loyaltyPoint ' + id))
    req.loyaltyPoint = loyaltyPoint
    next()
  })
}
 
exports.all = function(req, res){
 LoyaltyPoint.find().populate('loyaltyScheme customer').exec(function(err, loyaltyPoints) {
   if (err) {
   		console.log(err);
      res.render('error', {status: 500});
   } else {      
      res.jsonp(loyaltyPoints);
   }
 });
}
 
exports.queryCount = function(req, res){
 LoyaltyPoint.find(req.query.q).count().exec(function(err, count) {
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
  
    if ( req.query.q2.loyaltyScheme ) {
      req.query.q.loyaltyScheme = req.query.q2.loyaltyScheme;
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

   LoyaltyPoint.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('loyaltyScheme customer')
        .exec(function(err, loyaltyPoints) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = loyaltyPoints;
          res.jsonp(responseObj);
     }
   });
 }
 
 console.log("================== req.query ====================");
 console.log(req.query);
 console.log("================== req.query ====================");

 if ( req.query.page == 1 ) {
   LoyaltyPoint.find(req.query.q).count().exec(function(err, count) {
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
  var loyaltyPoint = req.loyaltyPoint
  

  
	  if ( req.body.loyaltyScheme ) {
	    req.body.loyaltyScheme = req.body.loyaltyScheme._id;
	  }
	  if ( req.body.customer ) {
	    req.body.customer = req.body.customer._id;
	  }
          
  loyaltyPoint = _.extend(loyaltyPoint, req.body)

  loyaltyPoint.modifiedby = req.user
  loyaltyPoint.modified = new Date()
  
  loyaltyPoint.save(function(err) {
    res.jsonp(loyaltyPoint)
  })
}
 
exports.destroy = function(req, res){
  var loyaltyPoint = req.loyaltyPoint
  loyaltyPoint.remove(function(err){
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
  , LoyaltyPoint = mongoose.model('LoyaltyPoint')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var loyaltyPoint = new LoyaltyPoint(req.body)

  loyaltyPoint.createdby = req.user
  loyaltyPoint.created = new Date()

  loyaltyPoint.save()
  res.jsonp(loyaltyPoint)
}
 
exports.show = function(req, res){
  res.jsonp(req.loyaltyPoint);
}
 
exports.loyaltyPoint = function(req, res, next, id){
  var LoyaltyPoint = mongoose.model('LoyaltyPoint')
  LoyaltyPoint.load(id, function (err, loyaltyPoint) {
    if (err) return next(err)
    if (!loyaltyPoint) return next(new Error('Failed to load loyaltyPoint ' + id))
    req.loyaltyPoint = loyaltyPoint
    next()
  })
}
 
exports.all = function(req, res){
 LoyaltyPoint.find().populate('loyaltyScheme').exec(function(err, loyaltyPoints) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(loyaltyPoints);
   }
 });
}
 
exports.update = function(req, res){
  var loyaltyPoint = req.loyaltyPoint
  loyaltyPoint = _.extend(loyaltyPoint, req.body)

  loyaltyPoint.modifiedby = req.user
  loyaltyPoint.modified = new Date()
  
  loyaltyPoint.save(function(err) {
    res.jsonp(loyaltyPoint)
  })
}
 
exports.destroy = function(req, res){
  var loyaltyPoint = req.loyaltyPoint
  loyaltyPoint.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
>>>>>>> 05644ebd4e842c71a618037d6cf2402b08f74c73
}