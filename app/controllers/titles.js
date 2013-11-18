var mongoose = require('mongoose')
  , async = require('async')
  , Title = mongoose.model('Title')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var title = new Title(req.body)

  title.createdby = req.user
  title.created = new Date()

  title.save()
  res.jsonp(title)
}
 
exports.show = function(req, res){
  res.jsonp(req.title);
}
 
exports.title = function(req, res, next, id){
  var Title = mongoose.model('Title')
  Title.load(id, function (err, title) {
    if (err) return next(err)
    if (!title) return next(new Error('Failed to load title ' + id))
    req.title = title
    next()
  })
}
 
exports.all = function(req, res){
 Title.find().populate('').exec(function(err, titles) {
   if (err) {
   		console.log(err);
      res.render('error', {status: 500});
   } else {      
      res.jsonp(titles);
   }
 });
}
 
exports.queryCount = function(req, res){
 Title.find(req.query.q).count().exec(function(err, count) {
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

   Title.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('')
        .exec(function(err, titles) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = titles;
          res.jsonp(responseObj);
     }
   });
 }
 
 console.log("================== req.query ====================");
 console.log(req.query);
 console.log("================== req.query ====================");

 if ( req.query.page == 1 ) {
   Title.find(req.query.q).count().exec(function(err, count) {
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
  var title = req.title
  

  
          
  title = _.extend(title, req.body)

  title.modifiedby = req.user
  title.modified = new Date()
  
  title.save(function(err) {
    res.jsonp(title)
  })
}
 
exports.destroy = function(req, res){
  var title = req.title
  title.remove(function(err){
    if (err) {
   		console.log(err);
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}