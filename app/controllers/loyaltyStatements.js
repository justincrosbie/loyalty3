<<<<<<< HEAD
var mongoose = require('mongoose')
  , async = require('async')
  , LoyaltyStatement = mongoose.model('LoyaltyStatement')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var loyaltyStatement = new LoyaltyStatement(req.body)

  loyaltyStatement.createdby = req.user
  loyaltyStatement.created = new Date()

  loyaltyStatement.save()
  res.jsonp(loyaltyStatement)
}
 
exports.show = function(req, res){
  res.jsonp(req.loyaltyStatement);
}
 
exports.loyaltyStatement = function(req, res, next, id){
  var LoyaltyStatement = mongoose.model('LoyaltyStatement')
  LoyaltyStatement.load(id, function (err, loyaltyStatement) {
    if (err) return next(err)
    if (!loyaltyStatement) return next(new Error('Failed to load loyaltyStatement ' + id))
    req.loyaltyStatement = loyaltyStatement
    next()
  })
}
 
exports.all = function(req, res){
 LoyaltyStatement.find().populate('loyaltyScheme customer').exec(function(err, loyaltyStatements) {
   if (err) {
   		console.log(err);
      res.render('error', {status: 500});
   } else {      
      res.jsonp(loyaltyStatements);
   }
 });
}
 
exports.queryCount = function(req, res){
 LoyaltyStatement.find(req.query.q).count().exec(function(err, count) {
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

   LoyaltyStatement.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('loyaltyScheme customer')
        .exec(function(err, loyaltyStatements) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = loyaltyStatements;
          res.jsonp(responseObj);
     }
   });
 }
 
 console.log("================== req.query ====================");
 console.log(req.query);
 console.log("================== req.query ====================");

 if ( req.query.page == 1 ) {
   LoyaltyStatement.find(req.query.q).count().exec(function(err, count) {
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
  var loyaltyStatement = req.loyaltyStatement
  

  
	  if ( req.body.loyaltyScheme ) {
	    req.body.loyaltyScheme = req.body.loyaltyScheme._id;
	  }
	  if ( req.body.customer ) {
	    req.body.customer = req.body.customer._id;
	  }
          
  loyaltyStatement = _.extend(loyaltyStatement, req.body)

  loyaltyStatement.modifiedby = req.user
  loyaltyStatement.modified = new Date()
  
  loyaltyStatement.save(function(err) {
    res.jsonp(loyaltyStatement)
  })
}
 
exports.destroy = function(req, res){
  var loyaltyStatement = req.loyaltyStatement
  loyaltyStatement.remove(function(err){
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
  , LoyaltyStatement = mongoose.model('LoyaltyStatement')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var loyaltyStatement = new LoyaltyStatement(req.body)

  loyaltyStatement.createdby = req.user
  loyaltyStatement.created = new Date()

  loyaltyStatement.save()
  res.jsonp(loyaltyStatement)
}
 
exports.show = function(req, res){
  res.jsonp(req.loyaltyStatement);
}
 
exports.loyaltyStatement = function(req, res, next, id){
  var LoyaltyStatement = mongoose.model('LoyaltyStatement')
  LoyaltyStatement.load(id, function (err, loyaltyStatement) {
    if (err) return next(err)
    if (!loyaltyStatement) return next(new Error('Failed to load loyaltyStatement ' + id))
    req.loyaltyStatement = loyaltyStatement
    next()
  })
}
 
exports.all = function(req, res){
 LoyaltyStatement.find().populate('loyaltyScheme').exec(function(err, loyaltyStatements) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(loyaltyStatements);
   }
 });
}
 
exports.update = function(req, res){
  var loyaltyStatement = req.loyaltyStatement
  loyaltyStatement = _.extend(loyaltyStatement, req.body)

  loyaltyStatement.modifiedby = req.user
  loyaltyStatement.modified = new Date()
  
  loyaltyStatement.save(function(err) {
    res.jsonp(loyaltyStatement)
  })
}
 
exports.destroy = function(req, res){
  var loyaltyStatement = req.loyaltyStatement
  loyaltyStatement.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
>>>>>>> 05644ebd4e842c71a618037d6cf2402b08f74c73
}