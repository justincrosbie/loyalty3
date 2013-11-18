window.angular.module('ngff.controllers.subscriptions', [])
  .controller('SubscriptionsController', ['$scope','$routeParams','$location','Global','Subscriptions',
    function($scope, $routeParams, $location, Global,  Subscriptions) {
 
      $scope.global = Global;


      $scope.create = function () {

        if ( !this.subscription ) {
          this.subscription = $scope.tmpsubscription;
        }

        var subscription = new Subscriptions({ 

          name: this.subscription.name ? this.subscription.name : null,
          rate: this.subscription.rate ? this.subscription.rate : null
        });
 
        subscription.$save(function (response) {
          $location.path("subscriptions/" + response._id);
        });
      };
 
      $scope.update = function () {
        var subscription = $scope.subscription;
 
        subscription.$update(function () {
          $location.path('subscriptions/' + subscription._id);
        });
      };
 
      $scope.find = function (query) {
        Subscriptions.query(query, function (subscriptions) {
          $scope.subscriptions = subscriptions.data;
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

        Subscriptions.query(query, function (subscriptions) {
          $scope.subscriptions = subscriptions.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = subscriptions.count;
          }
        });
      };
 
      $scope.findOne = function () {
        Subscriptions.get({ subscriptionId: $routeParams.subscriptionId }, function (subscription) {
          $scope.subscription = subscription;
          
        });
      };
 
      $scope.remove = function (subscription) {
        Subscriptions.get({ subscriptionId: subscription._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.subscriptions) {
          if ($scope.subscriptions[i] == subscription) {
            $scope.subscriptions.splice(i, 1)
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