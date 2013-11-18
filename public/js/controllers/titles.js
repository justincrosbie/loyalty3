window.angular.module('ngff.controllers.titles', [])
  .controller('TitlesController', ['$scope','$routeParams','$location','Global','Titles',
    function($scope, $routeParams, $location, Global,  Titles) {
 
      $scope.global = Global;


      $scope.create = function () {

        if ( !this.title ) {
          this.title = $scope.tmptitle;
        }

        var title = new Titles({ 

          name: this.title.name ? this.title.name : null
        });
 
        title.$save(function (response) {
          $location.path("titles/" + response._id);
        });
      };
 
      $scope.update = function () {
        var title = $scope.title;
 
        title.$update(function () {
          $location.path('titles/' + title._id);
        });
      };
 
      $scope.find = function (query) {
        Titles.query(query, function (titles) {
          $scope.titles = titles.data;
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

        Titles.query(query, function (titles) {
          $scope.titles = titles.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = titles.count;
          }
        });
      };
 
      $scope.findOne = function () {
        Titles.get({ titleId: $routeParams.titleId }, function (title) {
          $scope.title = title;
          
        });
      };
 
      $scope.remove = function (title) {
        Titles.get({ titleId: title._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.titles) {
          if ($scope.titles[i] == title) {
            $scope.titles.splice(i, 1)
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