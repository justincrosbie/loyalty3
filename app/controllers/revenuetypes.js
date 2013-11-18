var mongoose = require('mongoose')
  , async = require('async')
  , Revenuetype = mongoose.model('Revenuetype')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var revenuetype = new Revenuetype(req.body)

  revenuetype.createdby = req.user
  revenuetype.created = new Date()

  revenuetype.save()
  res.jsonp(revenuetype)
}
 
exports.show = function(req, res){
  res.jsonp(req.revenuetype);
}
 
exports.revenuetype = function(req, res, next, id){
  var Revenuetype = mongoose.model('Revenuetype')
  Revenuetype.load(id, function (err, revenuetype) {
    if (err) return next(err)
    if (!revenuetype) return next(new Error('Failed to load revenuetype ' + id))
    req.revenuetype = revenuetype
    next()
  })
}
 
exports.all = function(req, res){
 Revenuetype.find().populate('site datasource customer').exec(function(err, revenuetypes) {
   if (err) {
   		console.log(err);
      res.render('error', {status: 500});
   } else {      
      res.jsonp(revenuetypes);
   }
 });
}
 
exports.queryCount = function(req, res){
 Revenuetype.find(req.query.q).count().exec(function(err, count) {
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

   Revenuetype.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('site datasource customer')
        .exec(function(err, revenuetypes) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = revenuetypes;
          res.jsonp(responseObj);
     }
   });
 }
 
 console.log("================== req.query ====================");
 console.log(req.query);
 console.log("================== req.query ====================");

 if ( req.query.page == 1 ) {
   Revenuetype.find(req.query.q).count().exec(function(err, count) {
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
  var revenuetype = req.revenuetype
  

  
	  if ( req.body.site ) {
	    req.body.site = req.body.site._id;
	  }
	  if ( req.body.datasource ) {
	    req.body.datasource = req.body.datasource._id;
	  }
	  if ( req.body.customer ) {
	    req.body.customer = req.body.customer._id;
	  }
          
  revenuetype = _.extend(revenuetype, req.body)

  revenuetype.modifiedby = req.user
  revenuetype.modified = new Date()
  
  revenuetype.save(function(err) {
    res.jsonp(revenuetype)
  })
}
 
exports.destroy = function(req, res){
  var revenuetype = req.revenuetype
  revenuetype.remove(function(err){
    if (err) {
   		console.log(err);
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}