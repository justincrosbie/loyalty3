var mongoose = require('mongoose')
  , async = require('async')
  , Room = mongoose.model('Room')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var room = new Room(req.body)

  room.createdby = req.user
  room.created = new Date()

  room.save()
  res.jsonp(room)
}
 
exports.show = function(req, res){
  res.jsonp(req.room);
}
 
exports.room = function(req, res, next, id){
  var Room = mongoose.model('Room')
  Room.load(id, function (err, room) {
    if (err) return next(err)
    if (!room) return next(new Error('Failed to load room ' + id))
    req.room = room
    next()
  })
}
 
exports.all = function(req, res){
 Room.find().populate('roomtype site datasource customer').exec(function(err, rooms) {
   if (err) {
   		console.log(err);
      res.render('error', {status: 500});
   } else {      
      res.jsonp(rooms);
   }
 });
}
 
exports.queryCount = function(req, res){
 Room.find(req.query.q).count().exec(function(err, count) {
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
  
    if ( req.query.q2.roomtype ) {
      req.query.q.roomtype = req.query.q2.roomtype;
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

   Room.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('roomtype site datasource customer')
        .exec(function(err, rooms) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = rooms;
          res.jsonp(responseObj);
     }
   });
 }
 
 console.log("================== req.query ====================");
 console.log(req.query);
 console.log("================== req.query ====================");

 if ( req.query.page == 1 ) {
   Room.find(req.query.q).count().exec(function(err, count) {
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
  var room = req.room
  

  
	  if ( req.body.roomtype ) {
	    req.body.roomtype = req.body.roomtype._id;
	  }
	  if ( req.body.site ) {
	    req.body.site = req.body.site._id;
	  }
	  if ( req.body.datasource ) {
	    req.body.datasource = req.body.datasource._id;
	  }
	  if ( req.body.customer ) {
	    req.body.customer = req.body.customer._id;
	  }
          
  room = _.extend(room, req.body)

  room.modifiedby = req.user
  room.modified = new Date()
  
  room.save(function(err) {
    res.jsonp(room)
  })
}
 
exports.destroy = function(req, res){
  var room = req.room
  room.remove(function(err){
    if (err) {
   		console.log(err);
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}