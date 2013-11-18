window.angular.module('ngff.controllers.loyaltyMembers', [])
  .controller('LoyaltyMembersController', ['$scope','$routeParams','$location','Global','LoyaltySchemes','Persons','Customers','LoyaltyMembers',
    function($scope, $routeParams, $location, Global, LoyaltySchemes,Persons,Customers, LoyaltyMembers) {
 
      $scope.global = Global;


      $scope.create = function () {

        if ( !this.loyaltyMember ) {
          this.loyaltyMember = $scope.tmployaltyMember;
        }

        var loyaltyMember = new LoyaltyMembers({ 

          loyaltyScheme: this.loyaltyMember.loyaltyScheme ? this.loyaltyMember.loyaltyScheme._id : null,
          code: this.loyaltyMember.code ? this.loyaltyMember.code : null,
          person: this.loyaltyMember.person ? this.loyaltyMember.person._id : null,
          isactive: this.loyaltyMember.isactive ? this.loyaltyMember.isactive : null,
          start: this.loyaltyMember.start ? this.loyaltyMember.start : null,
          end: this.loyaltyMember.end ? this.loyaltyMember.end : null,
          password: this.loyaltyMember.password ? this.loyaltyMember.password : null,
          customer: this.loyaltyMember.customer ? this.loyaltyMember.customer._id : null
        });
 
        loyaltyMember.$save(function (response) {
          $location.path("loyaltyMembers/" + response._id);
        });
      };
 
      $scope.update = function () {
        var loyaltyMember = $scope.loyaltyMember;
 
        loyaltyMember.$update(function () {
          $location.path('loyaltyMembers/' + loyaltyMember._id);
        });
      };
 
      $scope.find = function (query) {
        LoyaltyMembers.query(query, function (loyaltyMembers) {
          $scope.loyaltyMembers = loyaltyMembers.data;
        });
      };
 
      $scope.currentPage = 1;
      $scope.totalItems = 100;
      $scope.maxSize = 5;
      $scope.sortOrder = 1;
      var searchFields = ['code'];
      var sortFields = ['loyaltyScheme','code'];

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
        if ( $scope.personSearch ) {
          	q2val.person = $scope.personSearch._id;
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

        LoyaltyMembers.query(query, function (loyaltyMembers) {
          $scope.loyaltyMembers = loyaltyMembers.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = loyaltyMembers.count;
          }
        });
      };
 
      $scope.findOne = function () {
        LoyaltyMembers.get({ loyaltyMemberId: $routeParams.loyaltyMemberId }, function (loyaltyMember) {
          $scope.loyaltyMember = loyaltyMember;
          
          if ( $scope.loyaltyMember && $scope.loyaltyMember.start ) {
            $scope.loyaltyMember.start = new Date($scope.loyaltyMember.start);
          }
          if ( $scope.loyaltyMember && $scope.loyaltyMember.end ) {
            $scope.loyaltyMember.end = new Date($scope.loyaltyMember.end);
          }
        });
      };
 
      $scope.remove = function (loyaltyMember) {
        LoyaltyMembers.get({ loyaltyMemberId: loyaltyMember._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.loyaltyMembers) {
          if ($scope.loyaltyMembers[i] == loyaltyMember) {
            $scope.loyaltyMembers.splice(i, 1)
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