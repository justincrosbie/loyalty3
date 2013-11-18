<<<<<<< HEAD
var mongoose = require('mongoose')
  , async = require('async')
  , LoyaltyTransaction = mongoose.model('LoyaltyTransaction')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var loyaltyTransaction = new LoyaltyTransaction(req.body)

  loyaltyTransaction.createdby = req.user
  loyaltyTransaction.created = new Date()

  loyaltyTransaction.save()
  res.jsonp(loyaltyTransaction)
}
 
exports.show = function(req, res){
  res.jsonp(req.loyaltyTransaction);
}
 
exports.loyaltyTransaction = function(req, res, next, id){
  var LoyaltyTransaction = mongoose.model('LoyaltyTransaction')
  LoyaltyTransaction.load(id, function (err, loyaltyTransaction) {
    if (err) return next(err)
    if (!loyaltyTransaction) return next(new Error('Failed to load loyaltyTransaction ' + id))
    req.loyaltyTransaction = loyaltyTransaction
    next()
  })
}
 
exports.all = function(req, res){
 LoyaltyTransaction.find().populate('loyaltyScheme loyaltyStatement loyaltyMember loyaltyPoint booking revenue customer').exec(function(err, loyaltyTransactions) {
   if (err) {
   		console.log(err);
      res.render('error', {status: 500});
   } else {      
      res.jsonp(loyaltyTransactions);
   }
 });
}
 
exports.queryCount = function(req, res){
 LoyaltyTransaction.find(req.query.q).count().exec(function(err, count) {
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
    if ( req.query.q2.loyaltyStatement ) {
      req.query.q.loyaltyStatement = req.query.q2.loyaltyStatement;
    }
    if ( req.query.q2.loyaltyMember ) {
      req.query.q.loyaltyMember = req.query.q2.loyaltyMember;
    }
    if ( req.query.q2.loyaltyPoint ) {
      req.query.q.loyaltyPoint = req.query.q2.loyaltyPoint;
    }
    if ( req.query.q2.booking ) {
      req.query.q.booking = req.query.q2.booking;
    }
    if ( req.query.q2.revenue ) {
      req.query.q.revenue = req.query.q2.revenue;
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

   LoyaltyTransaction.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('loyaltyScheme loyaltyStatement loyaltyMember loyaltyPoint booking revenue customer')
        .exec(function(err, loyaltyTransactions) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = loyaltyTransactions;
          res.jsonp(responseObj);
     }
   });
 }
 
 console.log("================== req.query ====================");
 console.log(req.query);
 console.log("================== req.query ====================");

 if ( req.query.page == 1 ) {
   LoyaltyTransaction.find(req.query.q).count().exec(function(err, count) {
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
  var loyaltyTransaction = req.loyaltyTransaction
  

  
	  if ( req.body.loyaltyScheme ) {
	    req.body.loyaltyScheme = req.body.loyaltyScheme._id;
	  }
	  if ( req.body.loyaltyStatement ) {
	    req.body.loyaltyStatement = req.body.loyaltyStatement._id;
	  }
	  if ( req.body.loyaltyMember ) {
	    req.body.loyaltyMember = req.body.loyaltyMember._id;
	  }
	  if ( req.body.loyaltyPoint ) {
	    req.body.loyaltyPoint = req.body.loyaltyPoint._id;
	  }
	  if ( req.body.booking ) {
	    req.body.booking = req.body.booking._id;
	  }
	  if ( req.body.revenue ) {
	    req.body.revenue = req.body.revenue._id;
	  }
	  if ( req.body.customer ) {
	    req.body.customer = req.body.customer._id;
	  }
          
  loyaltyTransaction = _.extend(loyaltyTransaction, req.body)

  loyaltyTransaction.modifiedby = req.user
  loyaltyTransaction.modified = new Date()
  
  loyaltyTransaction.save(function(err) {
    res.jsonp(loyaltyTransaction)
  })
}
 
exports.destroy = function(req, res){
  var loyaltyTransaction = req.loyaltyTransaction
  loyaltyTransaction.remove(function(err){
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
  , LoyaltyTransaction = mongoose.model('LoyaltyTransaction')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var loyaltyTransaction = new LoyaltyTransaction(req.body)

  loyaltyTransaction.createdby = req.user
  loyaltyTransaction.created = new Date()

  loyaltyTransaction.save()
  res.jsonp(loyaltyTransaction)
}
 
exports.show = function(req, res){
  res.jsonp(req.loyaltyTransaction);
}
 
exports.loyaltyTransaction = function(req, res, next, id){
  var LoyaltyTransaction = mongoose.model('LoyaltyTransaction')
  LoyaltyTransaction.load(id, function (err, loyaltyTransaction) {
    if (err) return next(err)
    if (!loyaltyTransaction) return next(new Error('Failed to load loyaltyTransaction ' + id))
    req.loyaltyTransaction = loyaltyTransaction
    next()
  })
}
 
exports.all = function(req, res){
 LoyaltyTransaction.find().populate('loyaltyScheme').populate('loyaltyMember').populate('loyaltyPoint').populate('loyaltyStatement').populate('booking').populate('revenue').exec(function(err, loyaltyTransactions) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(loyaltyTransactions);
   }
 });
}
 
exports.update = function(req, res){
  var loyaltyTransaction = req.loyaltyTransaction
  loyaltyTransaction = _.extend(loyaltyTransaction, req.body)

  loyaltyTransaction.modifiedby = req.user
  loyaltyTransaction.modified = new Date()
  
  loyaltyTransaction.save(function(err) {
    res.jsonp(loyaltyTransaction)
  })
}
 
exports.destroy = function(req, res){
  var loyaltyTransaction = req.loyaltyTransaction
  loyaltyTransaction.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
>>>>>>> 05644ebd4e842c71a618037d6cf2402b08f74c73
}