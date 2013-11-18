var mongoose = require('mongoose')
  , async = require('async')
  , Revenue = mongoose.model('Revenue')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var revenue = new Revenue(req.body)

  revenue.createdby = req.user
  revenue.created = new Date()

  revenue.save()
  res.jsonp(revenue)
}
 
exports.show = function(req, res){
  res.jsonp(req.revenue);
}
 
exports.revenue = function(req, res, next, id){
  var Revenue = mongoose.model('Revenue')
  Revenue.load(id, function (err, revenue) {
    if (err) return next(err)
    if (!revenue) return next(new Error('Failed to load revenue ' + id))
    req.revenue = revenue
    next()
  })
}
 
exports.all = function(req, res){
 Revenue.find().populate('currency booking paymenttype revenuecode site datasource customer').exec(function(err, revenues) {
   if (err) {
   		console.log(err);
      res.render('error', {status: 500});
   } else {      
      res.jsonp(revenues);
   }
 });
}
 
exports.queryCount = function(req, res){
 Revenue.find(req.query.q).count().exec(function(err, count) {
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
  
    if ( req.query.q2.currency ) {
      req.query.q.currency = req.query.q2.currency;
    }
    if ( req.query.q2.booking ) {
      req.query.q.booking = req.query.q2.booking;
    }
    if ( req.query.q2.paymenttype ) {
      req.query.q.paymenttype = req.query.q2.paymenttype;
    }
    if ( req.query.q2.revenuecode ) {
      req.query.q.revenuecode = req.query.q2.revenuecode;
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

   Revenue.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('currency booking paymenttype revenuecode site datasource customer')
        .exec(function(err, revenues) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = revenues;
          res.jsonp(responseObj);
     }
   });
 }
 
 console.log("================== req.query ====================");
 console.log(req.query);
 console.log("================== req.query ====================");

 if ( req.query.page == 1 ) {
   Revenue.find(req.query.q).count().exec(function(err, count) {
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
  var revenue = req.revenue
  

  
	  if ( req.body.currency ) {
	    req.body.currency = req.body.currency._id;
	  }
	  if ( req.body.booking ) {
	    req.body.booking = req.body.booking._id;
	  }
	  if ( req.body.paymenttype ) {
	    req.body.paymenttype = req.body.paymenttype._id;
	  }
	  if ( req.body.revenuecode ) {
	    req.body.revenuecode = req.body.revenuecode._id;
	  }
	  if ( req.body.site ) {
	    req.body.site = req.body.site._id;
	  }
	  if ( req.body.datasource ) {
	    req.body.datasource = req.body.datasource._id;
	  }
	  if ( req.body.customer ) {
	    req.body.customer = req.body.customer._id;
	  }
          
  revenue = _.extend(revenue, req.body)

  revenue.modifiedby = req.user
  revenue.modified = new Date()
  
  revenue.save(function(err) {
    res.jsonp(revenue)
  })
}
 
exports.destroy = function(req, res){
  var revenue = req.revenue
  revenue.remove(function(err){
    if (err) {
   		console.log(err);
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}