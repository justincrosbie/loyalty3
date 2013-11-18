var mongoose = require('mongoose')
  , async = require('async')
  , Datasource = mongoose.model('Datasource')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var datasource = new Datasource(req.body)

  datasource.createdby = req.user
  datasource.created = new Date()

  datasource.save()
  res.jsonp(datasource)
}
 
exports.show = function(req, res){
  res.jsonp(req.datasource);
}
 
exports.datasource = function(req, res, next, id){
  var Datasource = mongoose.model('Datasource')
  Datasource.load(id, function (err, datasource) {
    if (err) return next(err)
    if (!datasource) return next(new Error('Failed to load datasource ' + id))
    req.datasource = datasource
    next()
  })
}
 
exports.all = function(req, res){
 Datasource.find().populate('datasourcetype customer').exec(function(err, datasources) {
   if (err) {
   		console.log(err);
      res.render('error', {status: 500});
   } else {      
      res.jsonp(datasources);
   }
 });
}
 
exports.queryCount = function(req, res){
 Datasource.find(req.query.q).count().exec(function(err, count) {
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
  
    if ( req.query.q2.datasourcetype ) {
      req.query.q.datasourcetype = req.query.q2.datasourcetype;
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

   Datasource.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('datasourcetype customer')
        .exec(function(err, datasources) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = datasources;
          res.jsonp(responseObj);
     }
   });
 }
 
 console.log("================== req.query ====================");
 console.log(req.query);
 console.log("================== req.query ====================");

 if ( req.query.page == 1 ) {
   Datasource.find(req.query.q).count().exec(function(err, count) {
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
  var datasource = req.datasource
  

  
	  if ( req.body.datasourcetype ) {
	    req.body.datasourcetype = req.body.datasourcetype._id;
	  }
	  if ( req.body.customer ) {
	    req.body.customer = req.body.customer._id;
	  }
          
  datasource = _.extend(datasource, req.body)

  datasource.modifiedby = req.user
  datasource.modified = new Date()
  
  datasource.save(function(err) {
    res.jsonp(datasource)
  })
}
 
exports.destroy = function(req, res){
  var datasource = req.datasource
  datasource.remove(function(err){
    if (err) {
   		console.log(err);
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}