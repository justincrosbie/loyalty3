var mongoose = require('mongoose')
  , async = require('async')
  , Booking = mongoose.model('Booking')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var booking = new Booking(req.body)

  booking.createdby = req.user
  booking.created = new Date()

  booking.save()
  res.jsonp(booking)
}
 
exports.show = function(req, res){
  res.jsonp(req.booking);
}
 
exports.booking = function(req, res, next, id){
  var Booking = mongoose.model('Booking')
  Booking.load(id, function (err, booking) {
    if (err) return next(err)
    if (!booking) return next(new Error('Failed to load booking ' + id))
    req.booking = booking
    next()
  })
}
 
exports.all = function(req, res){
 Booking.find().populate('bookingstatus bookingtype room ratecode marketcode channel sob person company site datasource customer').exec(function(err, bookings) {
   if (err) {
   		console.log(err);
      res.render('error', {status: 500});
   } else {      
      res.jsonp(bookings);
   }
 });
}
 
exports.queryCount = function(req, res){
 Booking.find(req.query.q).count().exec(function(err, count) {
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
  
    if ( req.query.q2.status ) {
      req.query.q.status = req.query.q2.status;
    }
    if ( req.query.q2.type ) {
      req.query.q.type = req.query.q2.type;
    }
    if ( req.query.q2.room ) {
      req.query.q.room = req.query.q2.room;
    }
    if ( req.query.q2.ratecode ) {
      req.query.q.ratecode = req.query.q2.ratecode;
    }
    if ( req.query.q2.marketcode ) {
      req.query.q.marketcode = req.query.q2.marketcode;
    }
    if ( req.query.q2.channel ) {
      req.query.q.channel = req.query.q2.channel;
    }
    if ( req.query.q2.sob ) {
      req.query.q.sob = req.query.q2.sob;
    }
    if ( req.query.q2.person ) {
      req.query.q.person = req.query.q2.person;
    }
    if ( req.query.q2.company ) {
      req.query.q.company = req.query.q2.company;
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

   Booking.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('bookingstatus bookingtype room ratecode marketcode channel sob person company site datasource customer')
        .exec(function(err, bookings) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = bookings;
          res.jsonp(responseObj);
     }
   });
 }
 
 console.log("================== req.query ====================");
 console.log(req.query);
 console.log("================== req.query ====================");

 if ( req.query.page == 1 ) {
   Booking.find(req.query.q).count().exec(function(err, count) {
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
  var booking = req.booking
  

  
	  if ( req.body.status ) {
	    req.body.status = req.body.status._id;
	  }
	  if ( req.body.type ) {
	    req.body.type = req.body.type._id;
	  }
	  if ( req.body.room ) {
	    req.body.room = req.body.room._id;
	  }
	  if ( req.body.ratecode ) {
	    req.body.ratecode = req.body.ratecode._id;
	  }
	  if ( req.body.marketcode ) {
	    req.body.marketcode = req.body.marketcode._id;
	  }
	  if ( req.body.channel ) {
	    req.body.channel = req.body.channel._id;
	  }
	  if ( req.body.sob ) {
	    req.body.sob = req.body.sob._id;
	  }
	  if ( req.body.person ) {
	    req.body.person = req.body.person._id;
	  }
	  if ( req.body.company ) {
	    req.body.company = req.body.company._id;
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
          
  booking = _.extend(booking, req.body)

  booking.modifiedby = req.user
  booking.modified = new Date()
  
  booking.save(function(err) {
    res.jsonp(booking)
  })
}
 
exports.destroy = function(req, res){
  var booking = req.booking
  booking.remove(function(err){
    if (err) {
   		console.log(err);
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}