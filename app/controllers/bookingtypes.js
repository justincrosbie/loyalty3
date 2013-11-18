var mongoose = require('mongoose')
  , async = require('async')
  , Bookingtype = mongoose.model('Bookingtype')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var bookingtype = new Bookingtype(req.body)

  bookingtype.createdby = req.user
  bookingtype.created = new Date()

  bookingtype.save()
  res.jsonp(bookingtype)
}
 
exports.show = function(req, res){
  res.jsonp(req.bookingtype);
}
 
exports.bookingtype = function(req, res, next, id){
  var Bookingtype = mongoose.model('Bookingtype')
  Bookingtype.load(id, function (err, bookingtype) {
    if (err) return next(err)
    if (!bookingtype) return next(new Error('Failed to load bookingtype ' + id))
    req.bookingtype = bookingtype
    next()
  })
}
 
exports.all = function(req, res){
 Bookingtype.find().populate('customer').exec(function(err, bookingtypes) {
   if (err) {
   		console.log(err);
      res.render('error', {status: 500});
   } else {      
      res.jsonp(bookingtypes);
   }
 });
}
 
exports.queryCount = function(req, res){
 Bookingtype.find(req.query.q).count().exec(function(err, count) {
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

   Bookingtype.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('customer')
        .exec(function(err, bookingtypes) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = bookingtypes;
          res.jsonp(responseObj);
     }
   });
 }
 
 console.log("================== req.query ====================");
 console.log(req.query);
 console.log("================== req.query ====================");

 if ( req.query.page == 1 ) {
   Bookingtype.find(req.query.q).count().exec(function(err, count) {
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
  var bookingtype = req.bookingtype
  

  
	  if ( req.body.customer ) {
	    req.body.customer = req.body.customer._id;
	  }
          
  bookingtype = _.extend(bookingtype, req.body)

  bookingtype.modifiedby = req.user
  bookingtype.modified = new Date()
  
  bookingtype.save(function(err) {
    res.jsonp(bookingtype)
  })
}
 
exports.destroy = function(req, res){
  var bookingtype = req.bookingtype
  bookingtype.remove(function(err){
    if (err) {
   		console.log(err);
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}