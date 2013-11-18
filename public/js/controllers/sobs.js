window.angular.module('ngff.controllers.sobs', [])
  .controller('SobsController', ['$scope','$routeParams','$location','Global','Sites','Datasources','Customers','Sobs',
    function($scope, $routeParams, $location, Global, Sites,Datasources,Customers, Sobs) {
 
      $scope.global = Global;


      $scope.create = function () {

        if ( !this.sob ) {
          this.sob = $scope.tmpsob;
        }

        var sob = new Sobs({ 

          name: this.sob.name ? this.sob.name : null,
          code: this.sob.code ? this.sob.code : null,
          description: this.sob.description ? this.sob.description : null,
          site: this.sob.site ? this.sob.site._id : null,
          datasource: this.sob.datasource ? this.sob.datasource._id : null,
          customer: this.sob.customer ? this.sob.customer._id : null
        });
 
        sob.$save(function (response) {
          $location.path("sobs/" + response._id);
        });
      };
 
      $scope.update = function () {
        var sob = $scope.sob;
 
        sob.$update(function () {
          $location.path('sobs/' + sob._id);
        });
      };
 
      $scope.find = function (query) {
        Sobs.query(query, function (sobs) {
          $scope.sobs = sobs.data;
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

        Sobs.query(query, function (sobs) {
          $scope.sobs = sobs.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = sobs.count;
          }
        });
      };
 
      $scope.findOne = function () {
        Sobs.get({ sobId: $routeParams.sobId }, function (sob) {
          $scope.sob = sob;
          
        });
      };
 
      $scope.remove = function (sob) {
        Sobs.get({ sobId: sob._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.sobs) {
          if ($scope.sobs[i] == sob) {
            $scope.sobs.splice(i, 1)
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