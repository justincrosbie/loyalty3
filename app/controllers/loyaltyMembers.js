<<<<<<< HEAD
var mongoose = require('mongoose')
  , async = require('async')
  , LoyaltyMember = mongoose.model('LoyaltyMember')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var loyaltyMember = new LoyaltyMember(req.body)

  loyaltyMember.createdby = req.user
  loyaltyMember.created = new Date()

  loyaltyMember.save()
  res.jsonp(loyaltyMember)
}
 
exports.show = function(req, res){
  res.jsonp(req.loyaltyMember);
}
 
exports.loyaltyMember = function(req, res, next, id){
  var LoyaltyMember = mongoose.model('LoyaltyMember')
  LoyaltyMember.load(id, function (err, loyaltyMember) {
    if (err) return next(err)
    if (!loyaltyMember) return next(new Error('Failed to load loyaltyMember ' + id))
    req.loyaltyMember = loyaltyMember
    next()
  })
}
 
exports.all = function(req, res){
 LoyaltyMember.find().populate('loyaltyScheme person customer').exec(function(err, loyaltyMembers) {
   if (err) {
   		console.log(err);
      res.render('error', {status: 500});
   } else {      
      res.jsonp(loyaltyMembers);
   }
 });
}
 
exports.queryCount = function(req, res){
 LoyaltyMember.find(req.query.q).count().exec(function(err, count) {
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
    if ( req.query.q2.person ) {
      req.query.q.person = req.query.q2.person;
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

   LoyaltyMember.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('loyaltyScheme person customer')
        .exec(function(err, loyaltyMembers) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = loyaltyMembers;
          res.jsonp(responseObj);
     }
   });
 }
 
 console.log("================== req.query ====================");
 console.log(req.query);
 console.log("================== req.query ====================");

 if ( req.query.page == 1 ) {
   LoyaltyMember.find(req.query.q).count().exec(function(err, count) {
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
  var loyaltyMember = req.loyaltyMember
  

  
	  if ( req.body.loyaltyScheme ) {
	    req.body.loyaltyScheme = req.body.loyaltyScheme._id;
	  }
	  if ( req.body.person ) {
	    req.body.person = req.body.person._id;
	  }
	  if ( req.body.customer ) {
	    req.body.customer = req.body.customer._id;
	  }
          
  loyaltyMember = _.extend(loyaltyMember, req.body)

  loyaltyMember.modifiedby = req.user
  loyaltyMember.modified = new Date()
  
  loyaltyMember.save(function(err) {
    res.jsonp(loyaltyMember)
  })
}
 
exports.destroy = function(req, res){
  var loyaltyMember = req.loyaltyMember
  loyaltyMember.remove(function(err){
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
  , LoyaltyMember = mongoose.model('LoyaltyMember')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var loyaltyMember = new LoyaltyMember(req.body)

  loyaltyMember.createdby = req.user
  loyaltyMember.created = new Date()

  loyaltyMember.save()
  res.jsonp(loyaltyMember)
}
 
exports.show = function(req, res){
  res.jsonp(req.loyaltyMember);
}
 
exports.loyaltyMember = function(req, res, next, id){
  var LoyaltyMember = mongoose.model('LoyaltyMember')
  LoyaltyMember.load(id, function (err, loyaltyMember) {
    if (err) return next(err)
    if (!loyaltyMember) return next(new Error('Failed to load loyaltyMember ' + id))
    req.loyaltyMember = loyaltyMember
    next()
  })
}
 
exports.all = function(req, res){
 LoyaltyMember.find().populate('person').populate('loyaltyScheme').exec(function(err, loyaltyMembers) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(loyaltyMembers);
   }
 });
}
 
exports.update = function(req, res){
  var loyaltyMember = req.loyaltyMember
  loyaltyMember = _.extend(loyaltyMember, req.body)

  loyaltyMember.modifiedby = req.user
  loyaltyMember.modified = new Date()
  
  loyaltyMember.save(function(err) {
    res.jsonp(loyaltyMember)
  })
}
 
exports.destroy = function(req, res){
  var loyaltyMember = req.loyaltyMember
  loyaltyMember.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
>>>>>>> 05644ebd4e842c71a618037d6cf2402b08f74c73
}