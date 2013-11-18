var mongoose = require('mongoose')
  , async = require('async')
  , Datasourcetype = mongoose.model('Datasourcetype')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var datasourcetype = new Datasourcetype(req.body)

  datasourcetype.createdby = req.user
  datasourcetype.created = new Date()

  datasourcetype.save()
  res.jsonp(datasourcetype)
}
 
exports.show = function(req, res){
  res.jsonp(req.datasourcetype);
}
 
exports.datasourcetype = function(req, res, next, id){
  var Datasourcetype = mongoose.model('Datasourcetype')
  Datasourcetype.load(id, function (err, datasourcetype) {
    if (err) return next(err)
    if (!datasourcetype) return next(new Error('Failed to load datasourcetype ' + id))
    req.datasourcetype = datasourcetype
    next()
  })
}
 
exports.all = function(req, res){
 Datasourcetype.find().populate('').exec(function(err, datasourcetypes) {
   if (err) {
   		console.log(err);
      res.render('error', {status: 500});
   } else {      
      res.jsonp(datasourcetypes);
   }
 });
}
 
exports.queryCount = function(req, res){
 Datasourcetype.find(req.query.q).count().exec(function(err, count) {
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

   Datasourcetype.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('')
        .exec(function(err, datasourcetypes) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = datasourcetypes;
          res.jsonp(responseObj);
     }
   });
 }
 
 console.log("================== req.query ====================");
 console.log(req.query);
 console.log("================== req.query ====================");

 if ( req.query.page == 1 ) {
   Datasourcetype.find(req.query.q).count().exec(function(err, count) {
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
  var datasourcetype = req.datasourcetype
  

  
          
  datasourcetype = _.extend(datasourcetype, req.body)

  datasourcetype.modifiedby = req.user
  datasourcetype.modified = new Date()
  
  datasourcetype.save(function(err) {
    res.jsonp(datasourcetype)
  })
}
 
exports.destroy = function(req, res){
  var datasourcetype = req.datasourcetype
  datasourcetype.remove(function(err){
    if (err) {
   		console.log(err);
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}