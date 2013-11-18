window.angular.module('ngff.controllers.loyaltySchemes', [])
  .controller('LoyaltySchemesController', ['$scope','$routeParams','$location','Global','Customers','LoyaltySchemes',
    function($scope, $routeParams, $location, Global, Customers, LoyaltySchemes) {
 
      $scope.global = Global;


      $scope.create = function () {

        if ( !this.loyaltyScheme ) {
          this.loyaltyScheme = $scope.tmployaltyScheme;
        }

        var loyaltyScheme = new LoyaltySchemes({ 

          name: this.loyaltyScheme.name ? this.loyaltyScheme.name : null,
          code: this.loyaltyScheme.code ? this.loyaltyScheme.code : null,
          customer: this.loyaltyScheme.customer ? this.loyaltyScheme.customer._id : null,
          duration: this.loyaltyScheme.duration ? this.loyaltyScheme.duration : null
        });
 
        loyaltyScheme.$save(function (response) {
          $location.path("loyaltySchemes/" + response._id);
        });
      };
 
      $scope.update = function () {
        var loyaltyScheme = $scope.loyaltyScheme;
 
        loyaltyScheme.$update(function () {
          $location.path('loyaltySchemes/' + loyaltyScheme._id);
        });
      };
 
      $scope.find = function (query) {
        LoyaltySchemes.query(query, function (loyaltySchemes) {
          $scope.loyaltySchemes = loyaltySchemes.data;
        });
      };
 
      $scope.currentPage = 1;
      $scope.totalItems = 100;
      $scope.maxSize = 5;
      $scope.sortOrder = 1;
      var searchFields = ['name','code'];
      var sortFields = ['name','code'];

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

        LoyaltySchemes.query(query, function (loyaltySchemes) {
          $scope.loyaltySchemes = loyaltySchemes.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = loyaltySchemes.count;
          }
        });
      };
 
      $scope.findOne = function () {
        LoyaltySchemes.get({ loyaltySchemeId: $routeParams.loyaltySchemeId }, function (loyaltyScheme) {
          $scope.loyaltyScheme = loyaltyScheme;
          
        });
      };
 
      $scope.remove = function (loyaltyScheme) {
        LoyaltySchemes.get({ loyaltySchemeId: loyaltyScheme._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.loyaltySchemes) {
          if ($scope.loyaltySchemes[i] == loyaltyScheme) {
            $scope.loyaltySchemes.splice(i, 1)
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