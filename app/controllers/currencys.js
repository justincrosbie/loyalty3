var mongoose = require('mongoose')
  , async = require('async')
  , Currency = mongoose.model('Currency')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var currency = new Currency(req.body)

  currency.createdby = req.user
  currency.created = new Date()

  currency.save()
  res.jsonp(currency)
}
 
exports.show = function(req, res){
  res.jsonp(req.currency);
}
 
exports.currency = function(req, res, next, id){
  var Currency = mongoose.model('Currency')
  Currency.load(id, function (err, currency) {
    if (err) return next(err)
    if (!currency) return next(new Error('Failed to load currency ' + id))
    req.currency = currency
    next()
  })
}
 
exports.all = function(req, res){
 Currency.find().populate('').exec(function(err, currencys) {
   if (err) {
   		console.log(err);
      res.render('error', {status: 500});
   } else {      
      res.jsonp(currencys);
   }
 });
}
 
exports.queryCount = function(req, res){
 Currency.find(req.query.q).count().exec(function(err, count) {
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

   Currency.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('')
        .exec(function(err, currencys) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = currencys;
          res.jsonp(responseObj);
     }
   });
 }
 
 console.log("================== req.query ====================");
 console.log(req.query);
 console.log("================== req.query ====================");

 if ( req.query.page == 1 ) {
   Currency.find(req.query.q).count().exec(function(err, count) {
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
  var currency = req.currency
  

  
          
  currency = _.extend(currency, req.body)

  currency.modifiedby = req.user
  currency.modified = new Date()
  
  currency.save(function(err) {
    res.jsonp(currency)
  })
}
 
exports.destroy = function(req, res){
  var currency = req.currency
  currency.remove(function(err){
    if (err) {
   		console.log(err);
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}