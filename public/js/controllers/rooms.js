window.angular.module('ngff.controllers.rooms', [])
  .controller('RoomsController', ['$scope','$routeParams','$location','Global','Roomtypes','Sites','Datasources','Customers','Rooms',
    function($scope, $routeParams, $location, Global, Roomtypes,Sites,Datasources,Customers, Rooms) {
 
      $scope.global = Global;


      $scope.create = function () {

        if ( !this.room ) {
          this.room = $scope.tmproom;
        }

        var room = new Rooms({ 

          name: this.room.name ? this.room.name : null,
          code: this.room.code ? this.room.code : null,
          description: this.room.description ? this.room.description : null,
          roomtype: this.room.roomtype ? this.room.roomtype._id : null,
          site: this.room.site ? this.room.site._id : null,
          datasource: this.room.datasource ? this.room.datasource._id : null,
          customer: this.room.customer ? this.room.customer._id : null
        });
 
        room.$save(function (response) {
          $location.path("rooms/" + response._id);
        });
      };
 
      $scope.update = function () {
        var room = $scope.room;
 
        room.$update(function () {
          $location.path('rooms/' + room._id);
        });
      };
 
      $scope.find = function (query) {
        Rooms.query(query, function (rooms) {
          $scope.rooms = rooms.data;
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

  		
        if ( $scope.roomtypeSearch ) {
          	q2val.roomtype = $scope.roomtypeSearch._id;
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

        Rooms.query(query, function (rooms) {
          $scope.rooms = rooms.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = rooms.count;
          }
        });
      };
 
      $scope.findOne = function () {
        Rooms.get({ roomId: $routeParams.roomId }, function (room) {
          $scope.room = room;
          
        });
      };
 
      $scope.remove = function (room) {
        Rooms.get({ roomId: room._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.rooms) {
          if ($scope.rooms[i] == room) {
            $scope.rooms.splice(i, 1)
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