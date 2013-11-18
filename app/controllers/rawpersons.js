var mongoose = require('mongoose')
  , async = require('async')
  , Rawperson = mongoose.model('Rawperson')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var rawperson = new Rawperson(req.body)

  rawperson.createdby = req.user
  rawperson.created = new Date()

  rawperson.save()
  res.jsonp(rawperson)
}
 
exports.show = function(req, res){
  res.jsonp(req.rawperson);
}
 
exports.rawperson = function(req, res, next, id){
  var Rawperson = mongoose.model('Rawperson')
  Rawperson.load(id, function (err, rawperson) {
    if (err) return next(err)
    if (!rawperson) return next(new Error('Failed to load rawperson ' + id))
    req.rawperson = rawperson
    next()
  })
}
 
exports.all = function(req, res){
 Rawperson.find().populate('title country company country rawcompany customer datasource site').exec(function(err, rawpersons) {
   if (err) {
   		console.log(err);
      res.render('error', {status: 500});
   } else {      
      res.jsonp(rawpersons);
   }
 });
}
 
exports.queryCount = function(req, res){
 Rawperson.find(req.query.q).count().exec(function(err, count) {
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
  
    if ( req.query.q2.title ) {
      req.query.q.title = req.query.q2.title;
    }
    if ( req.query.q2.homecountry ) {
      req.query.q.homecountry = req.query.q2.homecountry;
    }
    if ( req.query.q2.company ) {
      req.query.q.company = req.query.q2.company;
    }
    if ( req.query.q2.workcountry ) {
      req.query.q.workcountry = req.query.q2.workcountry;
    }
    if ( req.query.q2.rawcompany ) {
      req.query.q.rawcompany = req.query.q2.rawcompany;
    }
    if ( req.query.q2.customer ) {
      req.query.q.customer = req.query.q2.customer;
    }
    if ( req.query.q2.datasource ) {
      req.query.q.datasource = req.query.q2.datasource;
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

   Rawperson.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('title country company country rawcompany customer datasource site')
        .exec(function(err, rawpersons) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = rawpersons;
          res.jsonp(responseObj);
     }
   });
 }
 
 console.log("================== req.query ====================");
 console.log(req.query);
 console.log("================== req.query ====================");

 if ( req.query.page == 1 ) {
   Rawperson.find(req.query.q).count().exec(function(err, count) {
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
  var rawperson = req.rawperson
  

  
	  if ( req.body.title ) {
	    req.body.title = req.body.title._id;
	  }
	  if ( req.body.homecountry ) {
	    req.body.homecountry = req.body.homecountry._id;
	  }
	  if ( req.body.company ) {
	    req.body.company = req.body.company._id;
	  }
	  if ( req.body.workcountry ) {
	    req.body.workcountry = req.body.workcountry._id;
	  }
	  if ( req.body.rawcompany ) {
	    req.body.rawcompany = req.body.rawcompany._id;
	  }
	  if ( req.body.customer ) {
	    req.body.customer = req.body.customer._id;
	  }
	  if ( req.body.datasource ) {
	    req.body.datasource = req.body.datasource._id;
	  }
	  if ( req.body.site ) {
	    req.body.site = req.body.site._id;
	  }
          
  rawperson = _.extend(rawperson, req.body)

  rawperson.modifiedby = req.user
  rawperson.modified = new Date()
  
  rawperson.save(function(err) {
    res.jsonp(rawperson)
  })
}
 
exports.destroy = function(req, res){
  var rawperson = req.rawperson
  rawperson.remove(function(err){
    if (err) {
   		console.log(err);
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}