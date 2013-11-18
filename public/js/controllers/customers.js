window.angular.module('ngff.controllers.customers', [])
  .controller('CustomersController', ['$scope','$routeParams','$location','Global','Customers',
    function($scope, $routeParams, $location, Global,  Customers) {
 
      $scope.global = Global;


      $scope.create = function () {

        if ( !this.customer ) {
          this.customer = $scope.tmpcustomer;
        }

        var customer = new Customers({ 

          name: this.customer.name ? this.customer.name : null
        });
 
        customer.$save(function (response) {
          $location.path("customers/" + response._id);
        });
      };
 
      $scope.update = function () {
        var customer = $scope.customer;
 
        customer.$update(function () {
          $location.path('customers/' + customer._id);
        });
      };
 
      $scope.find = function (query) {
        Customers.query(query, function (customers) {
          $scope.customers = customers.data;
        });
      };
 
      $scope.currentPage = 1;
      $scope.totalItems = 100;
      $scope.maxSize = 5;
      $scope.sortOrder = 1;
      var searchFields = ['name'];
      var sortFields = ['name'];

      $scope.sortField = sortFields[0];
      
      $scope.findPaged = function () {
        var term = $scope.query || '';
        var termArray = term.split(' ');
        
        var q2val = {};
        for ( var i=0; i<termArray.length; i++ ) {
        	if ( i <= searchFields.length ) {
        		q2val[searchFields[i]] = { regex : termArray[i], options: 'i' };
        	}
        }

  		

        var query = {
            q2: q2val
            , //search term
            sort_field: $scope.sortField,
            sort_order: $scope.sortOrder,
            page_limit: 10, // page size
            page: $scope.currentPage // page number
        };

        Customers.query(query, function (customers) {
          $scope.customers = customers.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = customers.count;
          }
        });
      };
 
      $scope.findOne = function () {
        Customers.get({ customerId: $routeParams.customerId }, function (customer) {
          $scope.customer = customer;
          
        });
      };
 
      $scope.remove = function (customer) {
        Customers.get({ customerId: customer._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.customers) {
          if ($scope.customers[i] == customer) {
            $scope.customers.splice(i, 1)
          }
        }
        $scope.totalItems--;
      };

      $scope.pageChanged = function(page) {
        $scope.currentPage = page;
        $scope.findPaged();
      };

      $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
      };

      $scope.sortClass = {};
      $scope.sortClass[searchFields[0]] = 'sortable sort-asc sort-desc';

      $scope.changeSort = function (sortField) {
        if ( $scope.sortField == sortField ) {
          $scope.sortOrder *= -1;
        } else {
          $scope.sortOrder = 1;
        }

        $scope.sortClass = {};
        $scope.sortClass[sortField] = $scope.sortOrder == -1 ? 'headerSortDown' : 'headerSortUp';

        $scope.sortField = sortField;
        $scope.findPaged();
      }

    }]);