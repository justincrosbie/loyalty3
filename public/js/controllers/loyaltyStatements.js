window.angular.module('ngff.controllers.loyaltyStatements', [])
  .controller('LoyaltyStatementsController', ['$scope','$routeParams','$location','Global','LoyaltySchemes','Customers','LoyaltyStatements',
    function($scope, $routeParams, $location, Global, LoyaltySchemes,Customers, LoyaltyStatements) {
 
      $scope.global = Global;


      $scope.create = function () {

        if ( !this.loyaltyStatement ) {
          this.loyaltyStatement = $scope.tmployaltyStatement;
        }

        var loyaltyStatement = new LoyaltyStatements({ 

          loyaltyScheme: this.loyaltyStatement.loyaltyScheme ? this.loyaltyStatement.loyaltyScheme._id : null,
          name: this.loyaltyStatement.name ? this.loyaltyStatement.name : null,
          description: this.loyaltyStatement.description ? this.loyaltyStatement.description : null,
          code: this.loyaltyStatement.code ? this.loyaltyStatement.code : null,
          isactive: this.loyaltyStatement.isactive ? this.loyaltyStatement.isactive : null,
          start: this.loyaltyStatement.start ? this.loyaltyStatement.start : null,
          end: this.loyaltyStatement.end ? this.loyaltyStatement.end : null,
          customer: this.loyaltyStatement.customer ? this.loyaltyStatement.customer._id : null
        });
 
        loyaltyStatement.$save(function (response) {
          $location.path("loyaltyStatements/" + response._id);
        });
      };
 
      $scope.update = function () {
        var loyaltyStatement = $scope.loyaltyStatement;
 
        loyaltyStatement.$update(function () {
          $location.path('loyaltyStatements/' + loyaltyStatement._id);
        });
      };
 
      $scope.find = function (query) {
        LoyaltyStatements.query(query, function (loyaltyStatements) {
          $scope.loyaltyStatements = loyaltyStatements.data;
        });
      };
 
      $scope.currentPage = 1;
      $scope.totalItems = 100;
      $scope.maxSize = 5;
      $scope.sortOrder = 1;
      var searchFields = ['name','code'];
      var sortFields = ['loyaltyScheme','name','code'];

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

  		
        if ( $scope.loyaltySchemeSearch ) {
          	q2val.loyaltyScheme = $scope.loyaltySchemeSearch._id;
        }
        if ( $scope.customerSearch ) {
          	q2val.customer = $scope.customerSearch._id;
        }

        var query = {
            q2: q2val
            , //search term
            sort_field: $scope.sortField,
            sort_order: $scope.sortOrder,
            page_limit: 10, // page size
            page: $scope.currentPage // page number
        };

        LoyaltyStatements.query(query, function (loyaltyStatements) {
          $scope.loyaltyStatements = loyaltyStatements.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = loyaltyStatements.count;
          }
        });
      };
 
      $scope.findOne = function () {
        LoyaltyStatements.get({ loyaltyStatementId: $routeParams.loyaltyStatementId }, function (loyaltyStatement) {
          $scope.loyaltyStatement = loyaltyStatement;
          
          if ( $scope.loyaltyStatement && $scope.loyaltyStatement.start ) {
            $scope.loyaltyStatement.start = new Date($scope.loyaltyStatement.start);
          }
          if ( $scope.loyaltyStatement && $scope.loyaltyStatement.end ) {
            $scope.loyaltyStatement.end = new Date($scope.loyaltyStatement.end);
          }
        });
      };
 
      $scope.remove = function (loyaltyStatement) {
        LoyaltyStatements.get({ loyaltyStatementId: loyaltyStatement._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.loyaltyStatements) {
          if ($scope.loyaltyStatements[i] == loyaltyStatement) {
            $scope.loyaltyStatements.splice(i, 1)
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