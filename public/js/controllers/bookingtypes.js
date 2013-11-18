window.angular.module('ngff.controllers.bookingtypes', [])
  .controller('BookingtypesController', ['$scope','$routeParams','$location','Global','Customers','Bookingtypes',
    function($scope, $routeParams, $location, Global, Customers, Bookingtypes) {
 
      $scope.global = Global;


      $scope.create = function () {

        if ( !this.bookingtype ) {
          this.bookingtype = $scope.tmpbookingtype;
        }

        var bookingtype = new Bookingtypes({ 

          name: this.bookingtype.name ? this.bookingtype.name : null,
          code: this.bookingtype.code ? this.bookingtype.code : null,
          description: this.bookingtype.description ? this.bookingtype.description : null,
          customer: this.bookingtype.customer ? this.bookingtype.customer._id : null
        });
 
        bookingtype.$save(function (response) {
          $location.path("bookingtypes/" + response._id);
        });
      };
 
      $scope.update = function () {
        var bookingtype = $scope.bookingtype;
 
        bookingtype.$update(function () {
          $location.path('bookingtypes/' + bookingtype._id);
        });
      };
 
      $scope.find = function (query) {
        Bookingtypes.query(query, function (bookingtypes) {
          $scope.bookingtypes = bookingtypes.data;
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

        Bookingtypes.query(query, function (bookingtypes) {
          $scope.bookingtypes = bookingtypes.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = bookingtypes.count;
          }
        });
      };
 
      $scope.findOne = function () {
        Bookingtypes.get({ bookingtypeId: $routeParams.bookingtypeId }, function (bookingtype) {
          $scope.bookingtype = bookingtype;
          
        });
      };
 
      $scope.remove = function (bookingtype) {
        Bookingtypes.get({ bookingtypeId: bookingtype._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.bookingtypes) {
          if ($scope.bookingtypes[i] == bookingtype) {
            $scope.bookingtypes.splice(i, 1)
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