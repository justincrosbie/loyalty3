var mongoose = require('mongoose')
  , async = require('async')
  , Booking = mongoose.model('Booking')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var booking = new Booking(req.body)

  booking.rawperson = req.body.rawperson
  booking.rawcompany = req.body.rawcompany

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
 Booking.find().populate('rawperson').populate('rawcompany').exec(function(err, bookings) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(bookings);
   }
 });
}
 
exports.update = function(req, res){
  var booking = req.booking
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
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}