<<<<<<< HEAD
var mongoose = require('mongoose')
  , async = require('async')
  , Person = mongoose.model('Person')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var person = new Person(req.body)

  person.createdby = req.user
  person.created = new Date()

  person.save()
  res.jsonp(person)
}
 
exports.show = function(req, res){
  res.jsonp(req.person);
}
 
exports.person = function(req, res, next, id){
  var Person = mongoose.model('Person')
  Person.load(id, function (err, person) {
    if (err) return next(err)
    if (!person) return next(new Error('Failed to load person ' + id))
    req.person = person
    next()
  })
}
 
exports.all = function(req, res){
 Person.find().populate('title country company country customer site').exec(function(err, persons) {
   if (err) {
   		console.log(err);
      res.render('error', {status: 500});
   } else {      
      res.jsonp(persons);
   }
 });
}
 
exports.queryCount = function(req, res){
 Person.find(req.query.q).count().exec(function(err, count) {
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

   Person.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('title country company country customer site')
        .exec(function(err, persons) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = persons;
          res.jsonp(responseObj);
     }
   });
 }
 
 console.log("================== req.query ====================");
 console.log(req.query);
 console.log("================== req.query ====================");

 if ( req.query.page == 1 ) {
   Person.find(req.query.q).count().exec(function(err, count) {
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
  var person = req.person
  

  
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
	  if ( req.body.customer ) {
	    req.body.customer = req.body.customer._id;
	  }
	  if ( req.body.site ) {
	    req.body.site = req.body.site._id;
	  }
          
  person = _.extend(person, req.body)

  person.modifiedby = req.user
  person.modified = new Date()
  
  person.save(function(err) {
    res.jsonp(person)
  })
}
 
exports.destroy = function(req, res){
  var person = req.person
  person.remove(function(err){
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
  , Person = mongoose.model('Person')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var person = new Person(req.body)

  person.createdby = req.user
  person.created = new Date()

  person.save()
  res.jsonp(person)
}
 
exports.show = function(req, res){
  res.jsonp(req.person);
}
 
exports.person = function(req, res, next, id){
  var Person = mongoose.model('Person')
  Person.load(id, function (err, person) {
    if (err) return next(err)
    if (!person) return next(new Error('Failed to load person ' + id))
    req.person = person
    next()
  })
}
 
exports.all = function(req, res){
 Person.find().populate('title').populate('company').populate('homecountry').populate('workcountry').populate('customer').populate('site').exec(function(err, customers) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(customers);
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
    if ( req.query.q2.firstname ) {
      req.query.q.firstname = {};
      req.query.q.firstname.$regex = req.query.q2.firstname.regex;
      req.query.q.firstname.$options = req.query.q2.firstname.options;
    }
    if ( req.query.q2.lastname ) {
      req.query.q.lastname = {};
      req.query.q.lastname.$regex = req.query.q2.lastname.regex;
      req.query.q.lastname.$options = req.query.q2.lastname.options;
    }
    if ( req.query.q2.customer ) {
      req.query.q.customer = req.query.q2.customer;
    }
    if ( req.query.q2.site ) {
      req.query.q.site = req.query.q2.site;
    }
  }

  console.log(req.query);

  var sort_field = req.query.sort_field;
  var sort_order = req.query.sort_order;

  //var sort_params = (sort_field == 'firstname' ? {firstname: sort_order} : (sort_field == 'dob' ? {dob: sort_order} : {}));
  var sort_params = {};
  sort_params[sort_field] = sort_order;

 var runMainQuery = function() {

   Person.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('title').populate('company').populate('homecountry').populate('workcountry').populate('customer').populate('site')
        .exec(function(err, customers) {
     if (err) {
        res.render('error', {status: 500});
     } else {      
          responseObj.data = customers;
          res.jsonp(responseObj);
     }
   });
 }

 if ( req.query.page == 1 ) {
   Person.find(req.query.q).count().exec(function(err, count) {
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
  var person = req.person
  person = _.extend(person, req.body)

  person.modifiedby = req.user
  person.modified = new Date()
  
  person.save(function(err) {
    res.jsonp(person)
  })
}
 
exports.destroy = function(req, res){
  var person = req.person
  person.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
>>>>>>> 05644ebd4e842c71a618037d6cf2402b08f74c73
}