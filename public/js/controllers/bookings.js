window.angular.module('ngff.controllers.bookings', [])
  .controller('BookingsController', ['$scope','$routeParams','$location', '$timeout','Global','Customers','Sites','Rawpersons','Rawcompanys','Bookings',
    function($scope, $routeParams, $location, $timeout, Global, Customers, Sites, Rawpersons, Rawcompanys, Bookings) {
 
      $scope.global = Global;

      $scope.detailsSelected = function(tmpbooking) {
        $scope.tmpbooking = tmpbooking;
      }
 
      $scope.contactSelected = function(tmpbooking) {
        $scope.tmpbooking = tmpbooking;
      }
 
      $scope.otherSelected = function(tmpbooking) {
        $scope.tmpbooking = tmpbooking;
      }
 
      $scope.populateLOVs = function(query) {

        Rawpersons.query(query, function (rawpersons) {
          $scope.rawpersons = rawpersons;
        });
        Rawcompanys.query(query, function (rawcompanys) {
          $scope.rawcompanys = rawcompanys;
        });
        Sites.query(query, function (sites) {
          $scope.sites = sites;
        });
        Customers.query(query, function (customers) {
          $scope.customers = customers;
        });
      };

      $scope.create = function () {

        if ( !this.booking ) {
          this.booking = $scope.tmpbooking;
        }
        
        var booking = new Bookings({ 
          code: this.booking.code,
          datebooked: this.booking.datebooked,
          start: this.booking.start,
          end: this.booking.end,
          rawperson: this.booking.rawperson,
          rawcompany: this.booking.rawcompany,
          site: this.booking.site,
          customer: this.booking.customer
        });
 
        booking.$save(function (response) {
          $location.path("bookings/" + response._id);
        });
      };
 
      $scope.update = function () {
        var booking = $scope.booking;
 
        booking.$update(function () {
          $location.path('bookings/' + booking._id);
        });
      };
 
      $scope.find = function (query) {
        Bookings.query(query, function (bookings) {
          $scope.bookings = bookings;
        });
      };
 
      $scope.findOne = function () {
        Bookings.get({ bookingId: $routeParams.bookingId }, function (booking) {
          $scope.booking = booking;
        });
      };
 
      $scope.remove = function (booking) {
        booking.$remove();
        for (var i in $scope.bookings) {
          if ($scope.bookings[i] == booking) {
            $scope.bookings.splice(i, 1)
          }
        }
      };
    }]);