var mongoose = require('mongoose')
  , async = require('async')
  , Bookingstatus = mongoose.model('Bookingstatus')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var bookingstatus = new Bookingstatus(req.body)

  bookingstatus.createdby = req.user
  bookingstatus.created = new Date()

  bookingstatus.save()
  res.jsonp(bookingstatus)
}
 
exports.show = function(req, res){
  res.jsonp(req.bookingstatus);
}
 
exports.bookingstatus = function(req, res, next, id){
  var Bookingstatus = mongoose.model('Bookingstatus')
  Bookingstatus.load(id, function (err, bookingstatus) {
    if (err) return next(err)
    if (!bookingstatus) return next(new Error('Failed to load bookingstatus ' + id))
    req.bookingstatus = bookingstatus
    next()
  })
}
 
exports.all = function(req, res){
 Bookingstatus.find().populate('customer').exec(function(err, bookingstatuss) {
   if (err) {
   		console.log(err);
      res.render('error', {status: 500});
   } else {      
      res.jsonp(bookingstatuss);
   }
 });
}
 
exports.queryCount = function(req, res){
 Bookingstatus.find(req.query.q).count().exec(function(err, count) {
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

   Bookingstatus.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('customer')
        .exec(function(err, bookingstatuss) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = bookingstatuss;
          res.jsonp(responseObj);
     }
   });
 }
 
 console.log("================== req.query ====================");
 console.log(req.query);
 console.log("================== req.query ====================");

 if ( req.query.page == 1 ) {
   Bookingstatus.find(req.query.q).count().exec(function(err, count) {
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
  var bookingstatus = req.bookingstatus
  

  
	  if ( req.body.customer ) {
	    req.body.customer = req.body.customer._id;
	  }
          
  bookingstatus = _.extend(bookingstatus, req.body)

  bookingstatus.modifiedby = req.user
  bookingstatus.modified = new Date()
  
  bookingstatus.save(function(err) {
    res.jsonp(bookingstatus)
  })
}
 
exports.destroy = function(req, res){
  var bookingstatus = req.bookingstatus
  bookingstatus.remove(function(err){
    if (err) {
   		console.log(err);
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}