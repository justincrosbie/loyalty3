window.angular.module('ngff.controllers.bookingstatuss', [])
  .controller('BookingstatussController', ['$scope','$routeParams','$location','Global','Customers','Bookingstatuss',
    function($scope, $routeParams, $location, Global, Customers, Bookingstatuss) {
 
      $scope.global = Global;


      $scope.create = function () {

        if ( !this.bookingstatus ) {
          this.bookingstatus = $scope.tmpbookingstatus;
        }

        var bookingstatus = new Bookingstatuss({ 

          name: this.bookingstatus.name ? this.bookingstatus.name : null,
          code: this.bookingstatus.code ? this.bookingstatus.code : null,
          description: this.bookingstatus.description ? this.bookingstatus.description : null,
          customer: this.bookingstatus.customer ? this.bookingstatus.customer._id : null
        });
 
        bookingstatus.$save(function (response) {
          $location.path("bookingstatuss/" + response._id);
        });
      };
 
      $scope.update = function () {
        var bookingstatus = $scope.bookingstatus;
 
        bookingstatus.$update(function () {
          $location.path('bookingstatuss/' + bookingstatus._id);
        });
      };
 
      $scope.find = function (query) {
        Bookingstatuss.query(query, function (bookingstatuss) {
          $scope.bookingstatuss = bookingstatuss.data;
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

        Bookingstatuss.query(query, function (bookingstatuss) {
          $scope.bookingstatuss = bookingstatuss.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = bookingstatuss.count;
          }
        });
      };
 
      $scope.findOne = function () {
        Bookingstatuss.get({ bookingstatusId: $routeParams.bookingstatusId }, function (bookingstatus) {
          $scope.bookingstatus = bookingstatus;
          
        });
      };
 
      $scope.remove = function (bookingstatus) {
        Bookingstatuss.get({ bookingstatusId: bookingstatus._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.bookingstatuss) {
          if ($scope.bookingstatuss[i] == bookingstatus) {
            $scope.bookingstatuss.splice(i, 1)
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