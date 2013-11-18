window.angular.module('ngff.controllers.ratecodes', [])
  .controller('RatecodesController', ['$scope','$routeParams','$location','Global','Sites','Datasources','Customers','Ratecodes',
    function($scope, $routeParams, $location, Global, Sites,Datasources,Customers, Ratecodes) {
 
      $scope.global = Global;


      $scope.create = function () {

        if ( !this.ratecode ) {
          this.ratecode = $scope.tmpratecode;
        }

        var ratecode = new Ratecodes({ 

          name: this.ratecode.name ? this.ratecode.name : null,
          code: this.ratecode.code ? this.ratecode.code : null,
          description: this.ratecode.description ? this.ratecode.description : null,
          site: this.ratecode.site ? this.ratecode.site._id : null,
          datasource: this.ratecode.datasource ? this.ratecode.datasource._id : null,
          customer: this.ratecode.customer ? this.ratecode.customer._id : null
        });
 
        ratecode.$save(function (response) {
          $location.path("ratecodes/" + response._id);
        });
      };
 
      $scope.update = function () {
        var ratecode = $scope.ratecode;
 
        ratecode.$update(function () {
          $location.path('ratecodes/' + ratecode._id);
        });
      };
 
      $scope.find = function (query) {
        Ratecodes.query(query, function (ratecodes) {
          $scope.ratecodes = ratecodes.data;
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

        Ratecodes.query(query, function (ratecodes) {
          $scope.ratecodes = ratecodes.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = ratecodes.count;
          }
        });
      };
 
      $scope.findOne = function () {
        Ratecodes.get({ ratecodeId: $routeParams.ratecodeId }, function (ratecode) {
          $scope.ratecode = ratecode;
          
        });
      };
 
      $scope.remove = function (ratecode) {
        Ratecodes.get({ ratecodeId: ratecode._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.ratecodes) {
          if ($scope.ratecodes[i] == ratecode) {
            $scope.ratecodes.splice(i, 1)
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