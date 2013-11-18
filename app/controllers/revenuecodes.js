var mongoose = require('mongoose')
  , async = require('async')
  , Revenuecode = mongoose.model('Revenuecode')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var revenuecode = new Revenuecode(req.body)

  revenuecode.createdby = req.user
  revenuecode.created = new Date()

  revenuecode.save()
  res.jsonp(revenuecode)
}
 
exports.show = function(req, res){
  res.jsonp(req.revenuecode);
}
 
exports.revenuecode = function(req, res, next, id){
  var Revenuecode = mongoose.model('Revenuecode')
  Revenuecode.load(id, function (err, revenuecode) {
    if (err) return next(err)
    if (!revenuecode) return next(new Error('Failed to load revenuecode ' + id))
    req.revenuecode = revenuecode
    next()
  })
}
 
exports.all = function(req, res){
 Revenuecode.find().populate('revenuetype site datasource customer').exec(function(err, revenuecodes) {
   if (err) {
   		console.log(err);
      res.render('error', {status: 500});
   } else {      
      res.jsonp(revenuecodes);
   }
 });
}
 
exports.queryCount = function(req, res){
 Revenuecode.find(req.query.q).count().exec(function(err, count) {
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
  
    if ( req.query.q2.revenuetype ) {
      req.query.q.revenuetype = req.query.q2.revenuetype;
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

   Revenuecode.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('revenuetype site datasource customer')
        .exec(function(err, revenuecodes) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = revenuecodes;
          res.jsonp(responseObj);
     }
   });
 }
 
 console.log("================== req.query ====================");
 console.log(req.query);
 console.log("================== req.query ====================");

 if ( req.query.page == 1 ) {
   Revenuecode.find(req.query.q).count().exec(function(err, count) {
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
  var revenuecode = req.revenuecode
  

  
	  if ( req.body.revenuetype ) {
	    req.body.revenuetype = req.body.revenuetype._id;
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
          
  revenuecode = _.extend(revenuecode, req.body)

  revenuecode.modifiedby = req.user
  revenuecode.modified = new Date()
  
  revenuecode.save(function(err) {
    res.jsonp(revenuecode)
  })
}
 
exports.destroy = function(req, res){
  var revenuecode = req.revenuecode
  revenuecode.remove(function(err){
    if (err) {
   		console.log(err);
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}