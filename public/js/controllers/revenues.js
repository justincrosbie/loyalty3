window.angular.module('ngff.controllers.revenues', [])
  .controller('RevenuesController', ['$scope','$routeParams','$location', '$timeout','Global','Customers','Sites','Currencys','Bookings','Revenues',
    function($scope, $routeParams, $location, $timeout, Global, Customers, Sites, Currencys, Bookings, Revenues) {
 
      $scope.global = Global;

      $scope.detailsSelected = function(tmprevenue) {
        $scope.tmprevenue = tmprevenue;
      }
 
      $scope.contactSelected = function(tmprevenue) {
        $scope.tmprevenue = tmprevenue;
      }
 
      $scope.otherSelected = function(tmprevenue) {
        $scope.tmprevenue = tmprevenue;
      }
 
      $scope.populateLOVs = function(query) {

        Currencys.query(query, function (currencys) {
          $scope.currencys = currencys;
        });
        Bookings.query(query, function (bookings) {
          $scope.bookings = bookings;
        });
        Sites.query(query, function (sites) {
          $scope.sites = sites;
        });
        Customers.query(query, function (customers) {
          $scope.customers = customers;
        });
      };

      $scope.create = function () {

        if ( !this.revenue ) {
          this.revenue = $scope.tmprevenue;
        }
        
        var revenue = new Revenues({ 
          code: this.revenue.code,
          datespent: this.revenue.datespent,
          amount: this.revenue.amount,
          currency: this.revenue.currency,
          booking: this.revenue.booking,
          site: this.revenue.site,
          customer: this.revenue.customer
        });
 
        revenue.$save(function (response) {
          $location.path("revenues/" + response._id);
        });
      };
 
      $scope.update = function () {
        var revenue = $scope.revenue;
 
        revenue.$update(function () {
          $location.path('revenues/' + revenue._id);
        });
      };
 
      $scope.find = function (query) {
        Revenues.query(query, function (revenues) {
          $scope.revenues = revenues;
        });
      };
 
      $scope.findOne = function () {
        Revenues.get({ revenueId: $routeParams.revenueId }, function (revenue) {
          $scope.revenue = revenue;
        });
      };
 
      $scope.remove = function (revenue) {
        revenue.$remove();
        for (var i in $scope.revenues) {
          if ($scope.revenues[i] == revenue) {
            $scope.revenues.splice(i, 1)
          }
        }
      };
    }]);