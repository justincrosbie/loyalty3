var mongoose = require('mongoose')
  , async = require('async')
  , Company = mongoose.model('Company')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var company = new Company(req.body)

  company.createdby = req.user
  company.created = new Date()

  company.save()
  res.jsonp(company)
}
 
exports.show = function(req, res){
  res.jsonp(req.company);
}
 
exports.company = function(req, res, next, id){
  var Company = mongoose.model('Company')
  Company.load(id, function (err, company) {
    if (err) return next(err)
    if (!company) return next(new Error('Failed to load company ' + id))
    req.company = company
    next()
  })
}
 
exports.all = function(req, res){
 Company.find().populate('country customer site').exec(function(err, companys) {
   if (err) {
   		console.log(err);
      res.render('error', {status: 500});
   } else {      
      res.jsonp(companys);
   }
 });
}
 
exports.queryCount = function(req, res){
 Company.find(req.query.q).count().exec(function(err, count) {
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
  
    if ( req.query.q2.country ) {
      req.query.q.country = req.query.q2.country;
    }
    if ( req.query.q2.customer ) {
      req.query.q.customer = req.query.q2.customer;
    }
    if ( req.query.q2.site ) {
      req.query.q.site = req.query.q2.site;
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

   Company.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('country customer site')
        .exec(function(err, companys) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = companys;
          res.jsonp(responseObj);
     }
   });
 }
 
 console.log("================== req.query ====================");
 console.log(req.query);
 console.log("================== req.query ====================");

 if ( req.query.page == 1 ) {
   Company.find(req.query.q).count().exec(function(err, count) {
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
  var company = req.company
  

  
	  if ( req.body.country ) {
	    req.body.country = req.body.country._id;
	  }
	  if ( req.body.customer ) {
	    req.body.customer = req.body.customer._id;
	  }
	  if ( req.body.site ) {
	    req.body.site = req.body.site._id;
	  }
          
  company = _.extend(company, req.body)

  company.modifiedby = req.user
  company.modified = new Date()
  
  company.save(function(err) {
    res.jsonp(company)
  })
}
 
exports.destroy = function(req, res){
  var company = req.company
  company.remove(function(err){
    if (err) {
   		console.log(err);
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}