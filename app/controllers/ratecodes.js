var mongoose = require('mongoose')
  , async = require('async')
  , Ratecode = mongoose.model('Ratecode')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var ratecode = new Ratecode(req.body)

  ratecode.createdby = req.user
  ratecode.created = new Date()

  ratecode.save()
  res.jsonp(ratecode)
}
 
exports.show = function(req, res){
  res.jsonp(req.ratecode);
}
 
exports.ratecode = function(req, res, next, id){
  var Ratecode = mongoose.model('Ratecode')
  Ratecode.load(id, function (err, ratecode) {
    if (err) return next(err)
    if (!ratecode) return next(new Error('Failed to load ratecode ' + id))
    req.ratecode = ratecode
    next()
  })
}
 
exports.all = function(req, res){
 Ratecode.find().populate('site datasource customer').exec(function(err, ratecodes) {
   if (err) {
   		console.log(err);
      res.render('error', {status: 500});
   } else {      
      res.jsonp(ratecodes);
   }
 });
}
 
exports.queryCount = function(req, res){
 Ratecode.find(req.query.q).count().exec(function(err, count) {
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

   Ratecode.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('site datasource customer')
        .exec(function(err, ratecodes) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = ratecodes;
          res.jsonp(responseObj);
     }
   });
 }
 
 console.log("================== req.query ====================");
 console.log(req.query);
 console.log("================== req.query ====================");

 if ( req.query.page == 1 ) {
   Ratecode.find(req.query.q).count().exec(function(err, count) {
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
  var ratecode = req.ratecode
  

  
	  if ( req.body.site ) {
	    req.body.site = req.body.site._id;
	  }
	  if ( req.body.datasource ) {
	    req.body.datasource = req.body.datasource._id;
	  }
	  if ( req.body.customer ) {
	    req.body.customer = req.body.customer._id;
	  }
          
  ratecode = _.extend(ratecode, req.body)

  ratecode.modifiedby = req.user
  ratecode.modified = new Date()
  
  ratecode.save(function(err) {
    res.jsonp(ratecode)
  })
}
 
exports.destroy = function(req, res){
  var ratecode = req.ratecode
  ratecode.remove(function(err){
    if (err) {
   		console.log(err);
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}