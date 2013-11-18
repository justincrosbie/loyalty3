window.angular.module('ngff.controllers.datasourcetypes', [])
  .controller('DatasourcetypesController', ['$scope','$routeParams','$location','Global','Datasourcetypes',
    function($scope, $routeParams, $location, Global,  Datasourcetypes) {
 
      $scope.global = Global;


      $scope.create = function () {

        if ( !this.datasourcetype ) {
          this.datasourcetype = $scope.tmpdatasourcetype;
        }

        var datasourcetype = new Datasourcetypes({ 

          name: this.datasourcetype.name ? this.datasourcetype.name : null
        });
 
        datasourcetype.$save(function (response) {
          $location.path("datasourcetypes/" + response._id);
        });
      };
 
      $scope.update = function () {
        var datasourcetype = $scope.datasourcetype;
 
        datasourcetype.$update(function () {
          $location.path('datasourcetypes/' + datasourcetype._id);
        });
      };
 
      $scope.find = function (query) {
        Datasourcetypes.query(query, function (datasourcetypes) {
          $scope.datasourcetypes = datasourcetypes.data;
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

        Datasourcetypes.query(query, function (datasourcetypes) {
          $scope.datasourcetypes = datasourcetypes.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = datasourcetypes.count;
          }
        });
      };
 
      $scope.findOne = function () {
        Datasourcetypes.get({ datasourcetypeId: $routeParams.datasourcetypeId }, function (datasourcetype) {
          $scope.datasourcetype = datasourcetype;
          
        });
      };
 
      $scope.remove = function (datasourcetype) {
        Datasourcetypes.get({ datasourcetypeId: datasourcetype._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.datasourcetypes) {
          if ($scope.datasourcetypes[i] == datasourcetype) {
            $scope.datasourcetypes.splice(i, 1)
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