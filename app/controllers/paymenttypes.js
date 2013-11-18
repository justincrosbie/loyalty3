var mongoose = require('mongoose')
  , async = require('async')
  , Paymenttype = mongoose.model('Paymenttype')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var paymenttype = new Paymenttype(req.body)

  paymenttype.createdby = req.user
  paymenttype.created = new Date()

  paymenttype.save()
  res.jsonp(paymenttype)
}
 
exports.show = function(req, res){
  res.jsonp(req.paymenttype);
}
 
exports.paymenttype = function(req, res, next, id){
  var Paymenttype = mongoose.model('Paymenttype')
  Paymenttype.load(id, function (err, paymenttype) {
    if (err) return next(err)
    if (!paymenttype) return next(new Error('Failed to load paymenttype ' + id))
    req.paymenttype = paymenttype
    next()
  })
}
 
exports.all = function(req, res){
 Paymenttype.find().populate('site datasource customer').exec(function(err, paymenttypes) {
   if (err) {
   		console.log(err);
      res.render('error', {status: 500});
   } else {      
      res.jsonp(paymenttypes);
   }
 });
}
 
exports.queryCount = function(req, res){
 Paymenttype.find(req.query.q).count().exec(function(err, count) {
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
  
    if ( req.query.q2.site ) {
      req.query.q.site = req.query.q2.site;
    }
    if ( req.query.q2.datasource ) {
      req.query.q.datasource = req.query.q2.datasource;
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

   Paymenttype.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('site datasource customer')
        .exec(function(err, paymenttypes) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = paymenttypes;
          res.jsonp(responseObj);
     }
   });
 }
 
 console.log("================== req.query ====================");
 console.log(req.query);
 console.log("================== req.query ====================");

 if ( req.query.page == 1 ) {
   Paymenttype.find(req.query.q).count().exec(function(err, count) {
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
  var paymenttype = req.paymenttype
  

  
	  if ( req.body.site ) {
	    req.body.site = req.body.site._id;
	  }
	  if ( req.body.datasource ) {
	    req.body.datasource = req.body.datasource._id;
	  }
	  if ( req.body.customer ) {
	    req.body.customer = req.body.customer._id;
	  }
          
  paymenttype = _.extend(paymenttype, req.body)

  paymenttype.modifiedby = req.user
  paymenttype.modified = new Date()
  
  paymenttype.save(function(err) {
    res.jsonp(paymenttype)
  })
}
 
exports.destroy = function(req, res){
  var paymenttype = req.paymenttype
  paymenttype.remove(function(err){
    if (err) {
   		console.log(err);
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}