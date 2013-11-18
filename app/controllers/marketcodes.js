var mongoose = require('mongoose')
  , async = require('async')
  , Marketcode = mongoose.model('Marketcode')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var marketcode = new Marketcode(req.body)

  marketcode.createdby = req.user
  marketcode.created = new Date()

  marketcode.save()
  res.jsonp(marketcode)
}
 
exports.show = function(req, res){
  res.jsonp(req.marketcode);
}
 
exports.marketcode = function(req, res, next, id){
  var Marketcode = mongoose.model('Marketcode')
  Marketcode.load(id, function (err, marketcode) {
    if (err) return next(err)
    if (!marketcode) return next(new Error('Failed to load marketcode ' + id))
    req.marketcode = marketcode
    next()
  })
}
 
exports.all = function(req, res){
 Marketcode.find().populate('site datasource customer').exec(function(err, marketcodes) {
   if (err) {
   		console.log(err);
      res.render('error', {status: 500});
   } else {      
      res.jsonp(marketcodes);
   }
 });
}
 
exports.queryCount = function(req, res){
 Marketcode.find(req.query.q).count().exec(function(err, count) {
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

   Marketcode.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('site datasource customer')
        .exec(function(err, marketcodes) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = marketcodes;
          res.jsonp(responseObj);
     }
   });
 }
 
 console.log("================== req.query ====================");
 console.log(req.query);
 console.log("================== req.query ====================");

 if ( req.query.page == 1 ) {
   Marketcode.find(req.query.q).count().exec(function(err, count) {
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
  var marketcode = req.marketcode
  

  
	  if ( req.body.site ) {
	    req.body.site = req.body.site._id;
	  }
	  if ( req.body.datasource ) {
	    req.body.datasource = req.body.datasource._id;
	  }
	  if ( req.body.customer ) {
	    req.body.customer = req.body.customer._id;
	  }
          
  marketcode = _.extend(marketcode, req.body)

  marketcode.modifiedby = req.user
  marketcode.modified = new Date()
  
  marketcode.save(function(err) {
    res.jsonp(marketcode)
  })
}
 
exports.destroy = function(req, res){
  var marketcode = req.marketcode
  marketcode.remove(function(err){
    if (err) {
   		console.log(err);
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}