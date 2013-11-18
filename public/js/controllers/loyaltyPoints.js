<<<<<<< HEAD
window.angular.module('ngff.controllers.loyaltyPoints', [])
  .controller('LoyaltyPointsController', ['$scope','$routeParams','$location','Global','LoyaltySchemes','Customers','LoyaltyPoints',
    function($scope, $routeParams, $location, Global, LoyaltySchemes,Customers, LoyaltyPoints) {
 
      $scope.global = Global;


      $scope.create = function () {

        if ( !this.loyaltyPoint ) {
          this.loyaltyPoint = $scope.tmployaltyPoint;
        }

        var loyaltyPoint = new LoyaltyPoints({ 

          loyaltyScheme: this.loyaltyPoint.loyaltyScheme ? this.loyaltyPoint.loyaltyScheme._id : null,
          name: this.loyaltyPoint.name ? this.loyaltyPoint.name : null,
          description: this.loyaltyPoint.description ? this.loyaltyPoint.description : null,
          code: this.loyaltyPoint.code ? this.loyaltyPoint.code : null,
          isactive: this.loyaltyPoint.isactive ? this.loyaltyPoint.isactive : null,
          start: this.loyaltyPoint.start ? this.loyaltyPoint.start : null,
          end: this.loyaltyPoint.end ? this.loyaltyPoint.end : null,
          formula: this.loyaltyPoint.formula ? this.loyaltyPoint.formula : null,
          customer: this.loyaltyPoint.customer ? this.loyaltyPoint.customer._id : null
        });
 
        loyaltyPoint.$save(function (response) {
          $location.path("loyaltyPoints/" + response._id);
        });
      };
 
      $scope.update = function () {
        var loyaltyPoint = $scope.loyaltyPoint;
 
        loyaltyPoint.$update(function () {
          $location.path('loyaltyPoints/' + loyaltyPoint._id);
        });
      };
 
      $scope.find = function (query) {
        LoyaltyPoints.query(query, function (loyaltyPoints) {
          $scope.loyaltyPoints = loyaltyPoints.data;
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

        LoyaltyPoints.query(query, function (loyaltyPoints) {
          $scope.loyaltyPoints = loyaltyPoints.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = loyaltyPoints.count;
          }
        });
      };
 
      $scope.findOne = function () {
        LoyaltyPoints.get({ loyaltyPointId: $routeParams.loyaltyPointId }, function (loyaltyPoint) {
          $scope.loyaltyPoint = loyaltyPoint;
          
          if ( $scope.loyaltyPoint && $scope.loyaltyPoint.start ) {
            $scope.loyaltyPoint.start = new Date($scope.loyaltyPoint.start);
          }
          if ( $scope.loyaltyPoint && $scope.loyaltyPoint.end ) {
            $scope.loyaltyPoint.end = new Date($scope.loyaltyPoint.end);
          }
        });
      };
 
      $scope.remove = function (loyaltyPoint) {
        LoyaltyPoints.get({ loyaltyPointId: loyaltyPoint._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.loyaltyPoints) {
          if ($scope.loyaltyPoints[i] == loyaltyPoint) {
            $scope.loyaltyPoints.splice(i, 1)
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

=======
window.angular.module('ngff.controllers.loyaltyPoints', [])
  .controller('LoyaltyPointsController', ['$scope','$routeParams','$location','Global','LoyaltySchemes','LoyaltyPoints',
    function($scope, $routeParams, $location, Global, LoyaltySchemes, LoyaltyPoints) {
 
      $scope.global = Global;
      $scope.active = false;
 

      $scope.populateLOVs = function(query) {

        LoyaltySchemes.query(query, function (loyaltySchemes) {
          $scope.loyaltySchemes = loyaltySchemes;
        });

      };

      $scope.create = function () {
        var loyaltyPoint = new LoyaltyPoints({ 
          name: this.loyaltyPoint.name,
          code: this.loyaltyPoint.code,
          description: this.loyaltyPoint.description,
          active: this.loyaltyPoint.active,
          formula: this.loyaltyPoint.formula,
          start: this.loyaltyPoint.start,
          end: this.loyaltyPoint.end,
          loyaltyScheme: this.loyaltyPoint.loyaltyScheme._id
        });
 
        loyaltyPoint.$save(function (response) {
          $location.path("loyaltyPoints/" + response._id);
        });
 
        this.name = "";
      };
 
      $scope.update = function () {
        var loyaltyPoint = $scope.loyaltyPoint;
 
        loyaltyPoint.$update(function () {
          $location.path('loyaltyPoints/' + loyaltyPoint._id);
        });
      };
 
      $scope.find = function (query) {
        LoyaltyPoints.query(query, function (loyaltyPoints) {
          $scope.loyaltyPoints = loyaltyPoints;
        });
      };
 
      $scope.findOne = function () {
        LoyaltyPoints.get({ loyaltyPointId: $routeParams.loyaltyPointId }, function (loyaltyPoint) {
          $scope.loyaltyPoint = loyaltyPoint;
        });
      };
 
      $scope.remove = function (loyaltyPoint) {
        loyaltyPoint.$remove();
        for (var i in $scope.loyaltyPoints) {
          if ($scope.loyaltyPoints[i] == loyaltyPoint) {
            $scope.loyaltyPoints.splice(i, 1)
          }
        }
      };
>>>>>>> 05644ebd4e842c71a618037d6cf2402b08f74c73
    }]);