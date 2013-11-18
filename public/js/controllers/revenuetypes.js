window.angular.module('ngff.controllers.revenuetypes', [])
  .controller('RevenuetypesController', ['$scope','$routeParams','$location','Global','Sites','Datasources','Customers','Revenuetypes',
    function($scope, $routeParams, $location, Global, Sites,Datasources,Customers, Revenuetypes) {
 
      $scope.global = Global;


      $scope.create = function () {

        if ( !this.revenuetype ) {
          this.revenuetype = $scope.tmprevenuetype;
        }

        var revenuetype = new Revenuetypes({ 

          name: this.revenuetype.name ? this.revenuetype.name : null,
          code: this.revenuetype.code ? this.revenuetype.code : null,
          description: this.revenuetype.description ? this.revenuetype.description : null,
          site: this.revenuetype.site ? this.revenuetype.site._id : null,
          datasource: this.revenuetype.datasource ? this.revenuetype.datasource._id : null,
          customer: this.revenuetype.customer ? this.revenuetype.customer._id : null
        });
 
        revenuetype.$save(function (response) {
          $location.path("revenuetypes/" + response._id);
        });
      };
 
      $scope.update = function () {
        var revenuetype = $scope.revenuetype;
 
        revenuetype.$update(function () {
          $location.path('revenuetypes/' + revenuetype._id);
        });
      };
 
      $scope.find = function (query) {
        Revenuetypes.query(query, function (revenuetypes) {
          $scope.revenuetypes = revenuetypes.data;
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

        Revenuetypes.query(query, function (revenuetypes) {
          $scope.revenuetypes = revenuetypes.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = revenuetypes.count;
          }
        });
      };
 
      $scope.findOne = function () {
        Revenuetypes.get({ revenuetypeId: $routeParams.revenuetypeId }, function (revenuetype) {
          $scope.revenuetype = revenuetype;
          
        });
      };
 
      $scope.remove = function (revenuetype) {
        Revenuetypes.get({ revenuetypeId: revenuetype._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.revenuetypes) {
          if ($scope.revenuetypes[i] == revenuetype) {
            $scope.revenuetypes.splice(i, 1)
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