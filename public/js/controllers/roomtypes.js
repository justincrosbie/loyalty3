window.angular.module('ngff.controllers.roomtypes', [])
  .controller('RoomtypesController', ['$scope','$routeParams','$location','Global','Sites','Datasources','Customers','Roomtypes',
    function($scope, $routeParams, $location, Global, Sites,Datasources,Customers, Roomtypes) {
 
      $scope.global = Global;


      $scope.create = function () {

        if ( !this.roomtype ) {
          this.roomtype = $scope.tmproomtype;
        }

        var roomtype = new Roomtypes({ 

          name: this.roomtype.name ? this.roomtype.name : null,
          code: this.roomtype.code ? this.roomtype.code : null,
          description: this.roomtype.description ? this.roomtype.description : null,
          site: this.roomtype.site ? this.roomtype.site._id : null,
          datasource: this.roomtype.datasource ? this.roomtype.datasource._id : null,
          customer: this.roomtype.customer ? this.roomtype.customer._id : null
        });
 
        roomtype.$save(function (response) {
          $location.path("roomtypes/" + response._id);
        });
      };
 
      $scope.update = function () {
        var roomtype = $scope.roomtype;
 
        roomtype.$update(function () {
          $location.path('roomtypes/' + roomtype._id);
        });
      };
 
      $scope.find = function (query) {
        Roomtypes.query(query, function (roomtypes) {
          $scope.roomtypes = roomtypes.data;
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

  		
        if ( $scope.siteSearch ) {
          	q2val.site = $scope.siteSearch._id;
        }
        if ( $scope.datasourceSearch ) {
          	q2val.datasource = $scope.datasourceSearch._id;
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

        Roomtypes.query(query, function (roomtypes) {
          $scope.roomtypes = roomtypes.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = roomtypes.count;
          }
        });
      };
 
      $scope.findOne = function () {
        Roomtypes.get({ roomtypeId: $routeParams.roomtypeId }, function (roomtype) {
          $scope.roomtype = roomtype;
          
        });
      };
 
      $scope.remove = function (roomtype) {
        Roomtypes.get({ roomtypeId: roomtype._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.roomtypes) {
          if ($scope.roomtypes[i] == roomtype) {
            $scope.roomtypes.splice(i, 1)
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