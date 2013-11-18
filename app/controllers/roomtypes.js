var mongoose = require('mongoose')
  , async = require('async')
  , Roomtype = mongoose.model('Roomtype')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var roomtype = new Roomtype(req.body)

  roomtype.createdby = req.user
  roomtype.created = new Date()

  roomtype.save()
  res.jsonp(roomtype)
}
 
exports.show = function(req, res){
  res.jsonp(req.roomtype);
}
 
exports.roomtype = function(req, res, next, id){
  var Roomtype = mongoose.model('Roomtype')
  Roomtype.load(id, function (err, roomtype) {
    if (err) return next(err)
    if (!roomtype) return next(new Error('Failed to load roomtype ' + id))
    req.roomtype = roomtype
    next()
  })
}
 
exports.all = function(req, res){
 Roomtype.find().populate('site datasource customer').exec(function(err, roomtypes) {
   if (err) {
   		console.log(err);
      res.render('error', {status: 500});
   } else {      
      res.jsonp(roomtypes);
   }
 });
}
 
exports.queryCount = function(req, res){
 Roomtype.find(req.query.q).count().exec(function(err, count) {
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

   Roomtype.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('site datasource customer')
        .exec(function(err, roomtypes) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = roomtypes;
          res.jsonp(responseObj);
     }
   });
 }
 
 console.log("================== req.query ====================");
 console.log(req.query);
 console.log("================== req.query ====================");

 if ( req.query.page == 1 ) {
   Roomtype.find(req.query.q).count().exec(function(err, count) {
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
  var roomtype = req.roomtype
  

  
	  if ( req.body.site ) {
	    req.body.site = req.body.site._id;
	  }
	  if ( req.body.datasource ) {
	    req.body.datasource = req.body.datasource._id;
	  }
	  if ( req.body.customer ) {
	    req.body.customer = req.body.customer._id;
	  }
          
  roomtype = _.extend(roomtype, req.body)

  roomtype.modifiedby = req.user
  roomtype.modified = new Date()
  
  roomtype.save(function(err) {
    res.jsonp(roomtype)
  })
}
 
exports.destroy = function(req, res){
  var roomtype = req.roomtype
  roomtype.remove(function(err){
    if (err) {
   		console.log(err);
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}