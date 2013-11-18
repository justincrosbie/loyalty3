var mongoose = require('mongoose')
  , async = require('async')
  , Subscription = mongoose.model('Subscription')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var subscription = new Subscription(req.body)

  subscription.createdby = req.user
  subscription.created = new Date()

  subscription.save()
  res.jsonp(subscription)
}
 
exports.show = function(req, res){
  res.jsonp(req.subscription);
}
 
exports.subscription = function(req, res, next, id){
  var Subscription = mongoose.model('Subscription')
  Subscription.load(id, function (err, subscription) {
    if (err) return next(err)
    if (!subscription) return next(new Error('Failed to load subscription ' + id))
    req.subscription = subscription
    next()
  })
}
 
exports.all = function(req, res){
 Subscription.find().populate('').exec(function(err, subscriptions) {
   if (err) {
   		console.log(err);
      res.render('error', {status: 500});
   } else {      
      res.jsonp(subscriptions);
   }
 });
}
 
exports.queryCount = function(req, res){
 Subscription.find(req.query.q).count().exec(function(err, count) {
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

   Subscription.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('')
        .exec(function(err, subscriptions) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = subscriptions;
          res.jsonp(responseObj);
     }
   });
 }
 
 console.log("================== req.query ====================");
 console.log(req.query);
 console.log("================== req.query ====================");

 if ( req.query.page == 1 ) {
   Subscription.find(req.query.q).count().exec(function(err, count) {
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
  var subscription = req.subscription
  

  
          
  subscription = _.extend(subscription, req.body)

  subscription.modifiedby = req.user
  subscription.modified = new Date()
  
  subscription.save(function(err) {
    res.jsonp(subscription)
  })
}
 
exports.destroy = function(req, res){
  var subscription = req.subscription
  subscription.remove(function(err){
    if (err) {
   		console.log(err);
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}