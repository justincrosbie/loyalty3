<<<<<<< HEAD
window.angular.module('ngff.controllers.loyaltyTransactions', [])
  .controller('LoyaltyTransactionsController', ['$scope','$routeParams','$location','Global','LoyaltySchemes','LoyaltyStatements','LoyaltyMembers','LoyaltyPoints','Bookings','Revenues','Customers','LoyaltyTransactions',
    function($scope, $routeParams, $location, Global, LoyaltySchemes,LoyaltyStatements,LoyaltyMembers,LoyaltyPoints,Bookings,Revenues,Customers, LoyaltyTransactions) {
 
      $scope.global = Global;


      $scope.create = function () {

        if ( !this.loyaltyTransaction ) {
          this.loyaltyTransaction = $scope.tmployaltyTransaction;
        }

        var loyaltyTransaction = new LoyaltyTransactions({ 

          loyaltyScheme: this.loyaltyTransaction.loyaltyScheme ? this.loyaltyTransaction.loyaltyScheme._id : null,
          loyaltyStatement: this.loyaltyTransaction.loyaltyStatement ? this.loyaltyTransaction.loyaltyStatement._id : null,
          loyaltyMember: this.loyaltyTransaction.loyaltyMember ? this.loyaltyTransaction.loyaltyMember._id : null,
          loyaltyPoint: this.loyaltyTransaction.loyaltyPoint ? this.loyaltyTransaction.loyaltyPoint._id : null,
          booking: this.loyaltyTransaction.booking ? this.loyaltyTransaction.booking._id : null,
          revenue: this.loyaltyTransaction.revenue ? this.loyaltyTransaction.revenue._id : null,
          comments: this.loyaltyTransaction.comments ? this.loyaltyTransaction.comments : null,
          points: this.loyaltyTransaction.points ? this.loyaltyTransaction.points : null,
          customer: this.loyaltyTransaction.customer ? this.loyaltyTransaction.customer._id : null
        });
 
        loyaltyTransaction.$save(function (response) {
          $location.path("loyaltyTransactions/" + response._id);
        });
      };
 
      $scope.update = function () {
        var loyaltyTransaction = $scope.loyaltyTransaction;
 
        loyaltyTransaction.$update(function () {
          $location.path('loyaltyTransactions/' + loyaltyTransaction._id);
        });
      };
 
      $scope.find = function (query) {
        LoyaltyTransactions.query(query, function (loyaltyTransactions) {
          $scope.loyaltyTransactions = loyaltyTransactions.data;
        });
      };
 
      $scope.currentPage = 1;
      $scope.totalItems = 100;
      $scope.maxSize = 5;
      $scope.sortOrder = 1;
      var searchFields = [];
      var sortFields = ['loyaltyScheme','loyaltyStatement','loyaltyMember','loyaltyPoint','booking','revenue'];

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
        if ( $scope.loyaltyStatementSearch ) {
          	q2val.loyaltyStatement = $scope.loyaltyStatementSearch._id;
        }
        if ( $scope.loyaltyMemberSearch ) {
          	q2val.loyaltyMember = $scope.loyaltyMemberSearch._id;
        }
        if ( $scope.loyaltyPointSearch ) {
          	q2val.loyaltyPoint = $scope.loyaltyPointSearch._id;
        }
        if ( $scope.bookingSearch ) {
          	q2val.booking = $scope.bookingSearch._id;
        }
        if ( $scope.revenueSearch ) {
          	q2val.revenue = $scope.revenueSearch._id;
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

        LoyaltyTransactions.query(query, function (loyaltyTransactions) {
          $scope.loyaltyTransactions = loyaltyTransactions.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = loyaltyTransactions.count;
          }
        });
      };
 
      $scope.findOne = function () {
        LoyaltyTransactions.get({ loyaltyTransactionId: $routeParams.loyaltyTransactionId }, function (loyaltyTransaction) {
          $scope.loyaltyTransaction = loyaltyTransaction;
          
        });
      };
 
      $scope.remove = function (loyaltyTransaction) {
        LoyaltyTransactions.get({ loyaltyTransactionId: loyaltyTransaction._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.loyaltyTransactions) {
          if ($scope.loyaltyTransactions[i] == loyaltyTransaction) {
            $scope.loyaltyTransactions.splice(i, 1)
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
window.angular.module('ngff.controllers.loyaltyTransactions', [])
  .controller('LoyaltyTransactionsController', ['$scope','$routeParams','$location','Global','LoyaltySchemes','LoyaltyStatements','LoyaltyMembers','LoyaltyPoints','LoyaltyTransactions','Bookings','Revenues',
    function($scope, $routeParams, $location, Global, LoyaltySchemes, LoyaltyStatements, LoyaltyMembers, LoyaltyPoints, LoyaltyTransactions, Bookings, Revenues) {
 
      $scope.global = Global;

      $scope.populateLOVs = function(query) {

        LoyaltySchemes.query(query, function (loyaltySchemes) {
          $scope.loyaltySchemes = loyaltySchemes;
        });
        LoyaltyStatements.query(query, function (loyaltyStatements) {
          $scope.loyaltyStatements = loyaltyStatements;
        });
        LoyaltyMembers.query(query, function (loyaltyMembers) {
          $scope.loyaltyMembers = loyaltyMembers;
        });
        LoyaltyPoints.query(query, function (loyaltyPoints) {
          $scope.loyaltyPoints = loyaltyPoints;
        });
        Bookings.query(query, function (bookings) {
          $scope.bookings = bookings;
        });
        Revenues.query(query, function (revenues) {
          $scope.revenues = revenues;
        });
      };

      $scope.create = function () {
        var loyaltyTransaction = new LoyaltyTransactions({ 
          comments: this.loyaltyTransaction.comments,
          points: this.loyaltyTransaction.points,
          loyaltyScheme: this.loyaltyTransaction.loyaltyScheme._id,
          loyaltyStatement: this.loyaltyTransaction.loyaltyStatement,
          loyaltyPoint: this.loyaltyTransaction.loyaltyPoint,
          loyaltyMember: this.loyaltyTransaction.loyaltyMember,
          booking: this.loyaltyTransaction.booking,
          revenue: this.loyaltyTransaction.revenue
        });
 
        loyaltyTransaction.$save(function (response) {
          $location.path("loyaltyTransactions/" + response._id);
        });
 
        this.name = "";
      };
 
      $scope.update = function () {
        var loyaltyTransaction = $scope.loyaltyTransaction;
 
        loyaltyTransaction.$update(function () {
          $location.path('loyaltyTransactions/' + loyaltyTransaction._id);
        });
      };
 
      $scope.find = function (query) {
        LoyaltyTransactions.query(query, function (loyaltyTransactions) {
          $scope.loyaltyTransactions = loyaltyTransactions;
        });
      };
 
      $scope.findOne = function () {
        LoyaltyTransactions.get({ loyaltyTransactionId: $routeParams.loyaltyTransactionId }, function (loyaltyTransaction) {
          $scope.loyaltyTransaction = loyaltyTransaction;
        });
      };
 
      $scope.remove = function (loyaltyTransaction) {
        loyaltyTransaction.$remove();
        for (var i in $scope.loyaltyTransactions) {
          if ($scope.loyaltyTransactions[i] == loyaltyTransaction) {
            $scope.loyaltyTransactions.splice(i, 1)
          }
        }
      };
>>>>>>> 05644ebd4e842c71a618037d6cf2402b08f74c73
    }]);