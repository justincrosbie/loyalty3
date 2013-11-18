window.angular.module('ngff.controllers.revenuecodes', [])
  .controller('RevenuecodesController', ['$scope','$routeParams','$location','Global','Revenuetypes','Sites','Datasources','Customers','Revenuecodes',
    function($scope, $routeParams, $location, Global, Revenuetypes,Sites,Datasources,Customers, Revenuecodes) {
 
      $scope.global = Global;


      $scope.create = function () {

        if ( !this.revenuecode ) {
          this.revenuecode = $scope.tmprevenuecode;
        }

        var revenuecode = new Revenuecodes({ 

          name: this.revenuecode.name ? this.revenuecode.name : null,
          code: this.revenuecode.code ? this.revenuecode.code : null,
          description: this.revenuecode.description ? this.revenuecode.description : null,
          revenuetype: this.revenuecode.revenuetype ? this.revenuecode.revenuetype._id : null,
          site: this.revenuecode.site ? this.revenuecode.site._id : null,
          datasource: this.revenuecode.datasource ? this.revenuecode.datasource._id : null,
          customer: this.revenuecode.customer ? this.revenuecode.customer._id : null
        });
 
        revenuecode.$save(function (response) {
          $location.path("revenuecodes/" + response._id);
        });
      };
 
      $scope.update = function () {
        var revenuecode = $scope.revenuecode;
 
        revenuecode.$update(function () {
          $location.path('revenuecodes/' + revenuecode._id);
        });
      };
 
      $scope.find = function (query) {
        Revenuecodes.query(query, function (revenuecodes) {
          $scope.revenuecodes = revenuecodes.data;
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

  		
        if ( $scope.revenuetypeSearch ) {
          	q2val.revenuetype = $scope.revenuetypeSearch._id;
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

        Revenuecodes.query(query, function (revenuecodes) {
          $scope.revenuecodes = revenuecodes.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = revenuecodes.count;
          }
        });
      };
 
      $scope.findOne = function () {
        Revenuecodes.get({ revenuecodeId: $routeParams.revenuecodeId }, function (revenuecode) {
          $scope.revenuecode = revenuecode;
          
        });
      };
 
      $scope.remove = function (revenuecode) {
        Revenuecodes.get({ revenuecodeId: revenuecode._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.revenuecodes) {
          if ($scope.revenuecodes[i] == revenuecode) {
            $scope.revenuecodes.splice(i, 1)
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