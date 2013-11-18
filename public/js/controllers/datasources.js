window.angular.module('ngff.controllers.datasources', [])
  .controller('DatasourcesController', ['$scope','$routeParams','$location','Global','Datasourcetypes','Customers','Datasources',
    function($scope, $routeParams, $location, Global, Datasourcetypes,Customers, Datasources) {
 
      $scope.global = Global;


      $scope.create = function () {

        if ( !this.datasource ) {
          this.datasource = $scope.tmpdatasource;
        }

        var datasource = new Datasources({ 

          name: this.datasource.name ? this.datasource.name : null,
          datasourcetype: this.datasource.datasourcetype ? this.datasource.datasourcetype._id : null,
          customer: this.datasource.customer ? this.datasource.customer._id : null,
          connectstr: this.datasource.connectstr ? this.datasource.connectstr : null,
          username: this.datasource.username ? this.datasource.username : null,
          password: this.datasource.password ? this.datasource.password : null
        });
 
        datasource.$save(function (response) {
          $location.path("datasources/" + response._id);
        });
      };
 
      $scope.update = function () {
        var datasource = $scope.datasource;
 
        datasource.$update(function () {
          $location.path('datasources/' + datasource._id);
        });
      };
 
      $scope.find = function (query) {
        Datasources.query(query, function (datasources) {
          $scope.datasources = datasources.data;
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

  		
        if ( $scope.datasourcetypeSearch ) {
          	q2val.datasourcetype = $scope.datasourcetypeSearch._id;
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

        Datasources.query(query, function (datasources) {
          $scope.datasources = datasources.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = datasources.count;
          }
        });
      };
 
      $scope.findOne = function () {
        Datasources.get({ datasourceId: $routeParams.datasourceId }, function (datasource) {
          $scope.datasource = datasource;
          
        });
      };
 
      $scope.remove = function (datasource) {
        Datasources.get({ datasourceId: datasource._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.datasources) {
          if ($scope.datasources[i] == datasource) {
            $scope.datasources.splice(i, 1)
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