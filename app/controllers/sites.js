<<<<<<< HEAD
var mongoose = require('mongoose')
  , async = require('async')
  , Site = mongoose.model('Site')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var site = new Site(req.body)

  site.createdby = req.user
  site.created = new Date()

  site.save()
  res.jsonp(site)
}
 
exports.show = function(req, res){
  res.jsonp(req.site);
}
 
exports.site = function(req, res, next, id){
  var Site = mongoose.model('Site')
  Site.load(id, function (err, site) {
    if (err) return next(err)
    if (!site) return next(new Error('Failed to load site ' + id))
    req.site = site
    next()
  })
}
 
exports.all = function(req, res){
 Site.find().populate('customer').exec(function(err, sites) {
   if (err) {
   		console.log(err);
      res.render('error', {status: 500});
   } else {      
      res.jsonp(sites);
   }
 });
}
 
exports.queryCount = function(req, res){
 Site.find(req.query.q).count().exec(function(err, count) {
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

   Site.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('customer')
        .exec(function(err, sites) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = sites;
          res.jsonp(responseObj);
     }
   });
 }
 
 console.log("================== req.query ====================");
 console.log(req.query);
 console.log("================== req.query ====================");

 if ( req.query.page == 1 ) {
   Site.find(req.query.q).count().exec(function(err, count) {
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
  var site = req.site
  

  
	  if ( req.body.customer ) {
	    req.body.customer = req.body.customer._id;
	  }
          
  site = _.extend(site, req.body)

  site.modifiedby = req.user
  site.modified = new Date()
  
  site.save(function(err) {
    res.jsonp(site)
  })
}
 
exports.destroy = function(req, res){
  var site = req.site
  site.remove(function(err){
    if (err) {
   		console.log(err);
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
=======
var mongoose = require('mongoose')
  , async = require('async')
  , Site = mongoose.model('Site')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var site = new Site(req.body)

  site.createdby = req.user
  site.created = new Date()

  site.save()
  res.jsonp(site)
}
 
exports.show = function(req, res){
  res.jsonp(req.site);
}
 
exports.site = function(req, res, next, id){
  var Site = mongoose.model('Site')
  Site.load(id, function (err, site) {
    if (err) return next(err)
    if (!site) return next(new Error('Failed to load site ' + id))
    req.site = site
    next()
  })
}
 
exports.all = function(req, res){
 Site.find().populate('customer').exec(function(err, sites) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(sites);
   }
 });
}
 
exports.queryCount = function(req, res){
 Person.find(req.query.q).count().exec(function(err, count) {
   if (err) {
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
    if ( req.query.q2.name ) {
      req.query.q.name = {};
      req.query.q.name.$regex = req.query.q2.name.regex;
      req.query.q.name.$options = req.query.q2.name.options;
    }
  }

  console.log(req.query);

 var runMainQuery = function() {

   Site.find(req.query.q).skip((req.query.page-1)*req.query.page_limit).limit(req.query.page_limit).populate('customer').exec(function(err, customers) {
     if (err) {
        res.render('error', {status: 500});
     } else {      
          responseObj.data = customers;
          res.jsonp(responseObj);
     }
   });
 }

 if ( req.query.page == 1 ) {
   Site.find(req.query.q).count().exec(function(err, count) {
     if (err) {
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
  var site = req.site
  site = _.extend(site, req.body)

  site.modifiedby = req.user
  site.modified = new Date()
  
  site.save(function(err) {
    res.jsonp(site)
  })
}
 
exports.destroy = function(req, res){
  var site = req.site
  site.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
>>>>>>> 05644ebd4e842c71a618037d6cf2402b08f74c73
}