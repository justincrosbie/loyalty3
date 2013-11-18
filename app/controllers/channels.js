var mongoose = require('mongoose')
  , async = require('async')
  , Channel = mongoose.model('Channel')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var channel = new Channel(req.body)

  channel.createdby = req.user
  channel.created = new Date()

  channel.save()
  res.jsonp(channel)
}
 
exports.show = function(req, res){
  res.jsonp(req.channel);
}
 
exports.channel = function(req, res, next, id){
  var Channel = mongoose.model('Channel')
  Channel.load(id, function (err, channel) {
    if (err) return next(err)
    if (!channel) return next(new Error('Failed to load channel ' + id))
    req.channel = channel
    next()
  })
}
 
exports.all = function(req, res){
 Channel.find().populate('site datasource customer').exec(function(err, channels) {
   if (err) {
   		console.log(err);
      res.render('error', {status: 500});
   } else {      
      res.jsonp(channels);
   }
 });
}
 
exports.queryCount = function(req, res){
 Channel.find(req.query.q).count().exec(function(err, count) {
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

   Channel.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('site datasource customer')
        .exec(function(err, channels) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = channels;
          res.jsonp(responseObj);
     }
   });
 }
 
 console.log("================== req.query ====================");
 console.log(req.query);
 console.log("================== req.query ====================");

 if ( req.query.page == 1 ) {
   Channel.find(req.query.q).count().exec(function(err, count) {
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
  var channel = req.channel
  

  
	  if ( req.body.site ) {
	    req.body.site = req.body.site._id;
	  }
	  if ( req.body.datasource ) {
	    req.body.datasource = req.body.datasource._id;
	  }
	  if ( req.body.customer ) {
	    req.body.customer = req.body.customer._id;
	  }
          
  channel = _.extend(channel, req.body)

  channel.modifiedby = req.user
  channel.modified = new Date()
  
  channel.save(function(err) {
    res.jsonp(channel)
  })
}
 
exports.destroy = function(req, res){
  var channel = req.channel
  channel.remove(function(err){
    if (err) {
   		console.log(err);
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}