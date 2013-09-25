window.angular.module('ngff.controllers.customers', [])
  .controller('CustomersController', ['$scope','$routeParams','$location', '$timeout','Global','Subscriptions','Customers',
    function($scope, $routeParams, $location, $timeout, Global, Subscriptions, Customers) {
 
      $scope.global = Global;
 
      $scope.populateSubscriptions = function(query) {
        Subscriptions.query(query, function (subscriptions) {
          $scope.subscriptions = subscriptions;
        });
      };
 
      $scope.create = function () {
        var customer = new Customers({ 
          name: this.customer.name,
          start: this.customer.start,
          end: this.customer.end,
          subscription: this.customer.subscription
        });
 
        customer.$save(function (response) {
          $location.path("customers/" + response._id);
        });
 
        this.name = "";
        this.subscription = "";
      };
 
      $scope.update = function () {
        var customer = $scope.customer;
 
        customer.$update(function () {
          $location.path('customers/' + customer._id);
        });
      };
 
      $scope.find = function (query) {
        Customers.query(query, function (customers) {
          $scope.customers = customers;
        });
      };
 
      $scope.findOne = function () {
        Customers.get({ customerId: $routeParams.customerId }, function (customer) {
          if ( !customer.subscription ) {
            customer.subscription = "";
          }
          $scope.customer = customer;
        });
      };
 
      $scope.remove = function (customer) {
        customer.$remove();
        for (var i in $scope.customers) {
          if ($scope.customers[i] == customer) {
            $scope.customers.splice(i, 1)
          }
        }
      };

    }]);