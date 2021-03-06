var mongoose = require('mongoose')
  , async = require('async')
  , Customer = mongoose.model('Customer')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var customer = new Customer(req.body)

  customer.createdby = req.user
  customer.created = new Date()

  customer.save()
  res.jsonp(customer)
}
 
exports.show = function(req, res){
  res.jsonp(req.customer);
}
 
exports.customer = function(req, res, next, id){
  var Customer = mongoose.model('Customer')
  Customer.load(id, function (err, customer) {
    if (err) return next(err)
    if (!customer) return next(new Error('Failed to load customer ' + id))
    req.customer = customer
    next()
  })
}
 
exports.all = function(req, res){
 Customer.find().populate('').exec(function(err, customers) {
   if (err) {
   		console.log(err);
      res.render('error', {status: 500});
   } else {      
      res.jsonp(customers);
   }
 });
}
 
exports.queryCount = function(req, res){
 Customer.find(req.query.q).count().exec(function(err, count) {
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

   Customer.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('')
        .exec(function(err, customers) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = customers;
          res.jsonp(responseObj);
     }
   });
 }
 
 console.log("================== req.query ====================");
 console.log(req.query);
 console.log("================== req.query ====================");

 if ( req.query.page == 1 ) {
   Customer.find(req.query.q).count().exec(function(err, count) {
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
  var customer = req.customer
  

  
          
  customer = _.extend(customer, req.body)

  customer.modifiedby = req.user
  customer.modified = new Date()
  
  customer.save(function(err) {
    res.jsonp(customer)
  })
}
 
exports.destroy = function(req, res){
  var customer = req.customer
  customer.remove(function(err){
    if (err) {
   		console.log(err);
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}