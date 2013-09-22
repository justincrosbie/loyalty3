window.angular.module('ngff.controllers.customers', [])
  .controller('CustomersController', ['$scope','$routeParams','$location','Global','Customers',
    function($scope, $routeParams, $location, Global, Customers) {
 
      $scope.global = Global;
 
      $scope.create = function () {
        var customer = new Customers({ 
          name: this.customer.name
        });
 
        customer.$save(function (response) {
          $location.path("customers/" + response._id);
        });
 
        this.name = "";
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