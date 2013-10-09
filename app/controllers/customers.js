var mongoose = require('mongoose')
  , async = require('async')
  , Customer = mongoose.model('Customer')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var customer = new Customer(req.body)

  customer.createdby = req.user
  customer.created = new Date()

  customer.save()
  res.jsonp(customer)
}
 
exports.show = function(req, res){
  res.jsonp(req.customer);
}
 
exports.customer = function(req, res, next, id){
  var Customer = mongoose.model('Customer')
  Customer.load(id, function (err, customer) {
    if (err) return next(err)
    if (!customer) return next(new Error('Failed to load customer ' + id))
    req.customer = customer
    next()
  })
}
 
exports.all = function(req, res){
 Customer.find().populate('subscription').exec(function(err, customers) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(customers);
   }
 });
}
 
exports.update = function(req, res){
  var customer = req.customer
  customer = _.extend(customer, req.body)

  customer.modifiedby = req.user
  customer.modified = new Date()
  
  customer.save(function(err) {
    res.jsonp(customer)
  })
}
 
exports.destroy = function(req, res){
  var customer = req.customer
  customer.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}